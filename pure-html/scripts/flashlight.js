document.addEventListener('mousemove', (e) => {
    document.getElementById('flashlight').style.setProperty("--Xpos", e.clientX + "px");
    document.getElementById('flashlight').style.setProperty("--Ypos", e.clientY + "px");
})

document.addEventListener('touchmove', (e) => {
    document.getElementById('flashlight').style.setProperty("--Xpos", e.touches[0].clientX + "px");
    document.getElementById('flashlight').style.setProperty("--Ypos", e.touches[0].clientY + "px");
})