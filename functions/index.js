const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

const tmpdir = require('os').tmpdir;
const join = require('path').join;
const fs = require('fs-extra');
const sharp = require('sharp')
const dimensions = [512, 256, 128, 64, 32];

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateFullname = functions.firestore
    .document('users/{uid}')
    .onUpdate(async (change, context) => {
        const currentData = change.after.data();
        const lastData = change.before.data();

        if(currentData.name !== lastData.name || currentData.lastName !== lastData.lastName){
            let batch = db.batch();
            try {
                let data = await db
                                    .collection("users")
                                    .doc(context.params.uid)
                                    .collection("reservations")
                                    .get();
                data.docs.forEach(doc => {
                    let reserva = doc.data();
                    batch.update(
                        db
                            .collection("shows")
                            .doc(reserva.production.show.sid)
                            .collection("productions")
                            .doc(reserva.production.pid)
                            .collection("reservations")
                            .doc(reserva.rid),
                        { 'user.name': currentData.name, 'user.lastName': currentData.lastName }
                    );
                });
                return batch.commit()
            } catch (error) {
                console.log(error)   
            }
        }
        return null;
    });

exports.generateThumbnails = functions.https.onCall(async (data, context) => {
    let token = await auth.verifyIdToken(data.idToken);
    if(!token){
        console.log('Called not authorized');
        return false;
    }
    let uid = token.uid;
    let pid = data.pictureId;
    const bucket = storage.bucket();
    let originalPicture = `users/${uid}/profile-picture/${pid}.jpg`;
    let physicalDirectory = join(tmpdir(), 'temp');
    let physicalRout = join(physicalDirectory, `${pid}.jpg`);
    try {
        await fs.ensureDir(physicalDirectory);
        await bucket.file(originalPicture).download({
            destination: physicalRout
        });
        let promises = dimensions.map(async dimension => {
            let width = dimension;
            let height = dimension;
            const pictureName = `${pid}-${width}x${height}.jpg`;
            const physicalRoutThumbnail = join(physicalDirectory, pictureName);
            await sharp(physicalRout)
                    .resize(width, height)
                    .toFile(physicalRoutThumbnail);
            const destination = `users/${uid}/profile-picture/${pictureName}`;
            await bucket.upload(physicalRoutThumbnail, {
                destination,
                uploadType: 'media',
                metadata: {
                    contentType: 'image/jpg'
                }
            });
            await fs.remove(physicalRoutThumbnail);
        });
        await Promise.all(promises);
        await fs.remove(physicalRout);
        await bucket.file(originalPicture).delete();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
});