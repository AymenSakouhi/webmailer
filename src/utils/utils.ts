export const shakeInput = (
  input: HTMLTextAreaElement | HTMLInputElement | HTMLButtonElement,
  behavior: boolean
) => {
  if (input && !behavior) {
    // add shake with tailwindcss
    input.classList.add('animate-bounce')
    // add border police
    input.style.border = '2px solid red'
    setTimeout(() => {
      input.classList.remove('animate-bounce')
      input.style.border = '1px solid black'
    }, 2500)
  }

  if (input && behavior) {
    // add shake with tailwindcss
    input.classList.add('animate-bounce')
    // add border police
    input.style.border = '2px solid green'
    setTimeout(() => {
      input.classList.remove('animate-bounce')
      input.style.border = '1px solid black'
    }, 2500)
  }
}

export const allowBtn = (input: HTMLButtonElement) => {
  input.disabled = false
  input.classList.remove('bg-rose-800')
  input.classList.add('bg-green-800')
}
