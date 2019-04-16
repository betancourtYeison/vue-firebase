const fullName = value => {
    if(value === undefined || value === null || value === '') {
      return true
    }

    return /^(?! )(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)
}
  
  export { fullName }