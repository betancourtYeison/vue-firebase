<template>
    <div id="receipt" class="section">
        <div class="main-receipt">
            <div class="show">
                <slot name="show"/>
            </div>
            <div class="schedules">
                <slot name="schedules"/>
            </div>
            <div class="seats">
                <slot name="seats"/>
            </div>
            <div class="total">
                <slot name="total"/>
            </div>
            <div class="attribute slogan">
                <span>Teatro Súper Ópera - Desde 1914</span>
            </div>
        </div>
    </div>
</template>

<style>
.main-receipt {
    background-color: white;
    padding: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
}
.show {
    font-size: 2.4rem;
    font-weight: bold;
    font-style: italic;
    padding: 5px;
}
.schedules {
    font-size: 2.2rem;
    padding: 5px;
}
.seats {
    font-weight: bold;
    margin: 20px;
}
.total {
    font-weight: bold;
    font-size: 2.4rem;
}
.slogan {
    font-weight: bold;
    font-size: 1.8rem;
}
</style>
