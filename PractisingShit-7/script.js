const strings = document.querySelectorAll('svg')


strings.forEach((string) => {
    string.addEventListener("mousemove", (e) => {
        if (string.classList.contains('first-chord')){
            
        }
        const rect = string.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top;
        gsap.to(string.querySelector('path'), {
            attr: {
                d: `M 90 22 Q ${x/2} ${y/2} 1150 22`
            },
            duration: 0.2,
            ease: "elastic.out"
        })
    })
    string.addEventListener("mouseleave", () => {
        gsap.to(string.querySelector("path"), {
            attr: {
                d: "M 90 22 Q 595 22 1150 22",
            },
            duration: 0.8,
            ease: "elastic.out"
        })
    })
})