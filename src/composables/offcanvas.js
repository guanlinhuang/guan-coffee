export function useOffcanvas() {
  const closeOffcanvas = () => {
    document.getElementById('closeOffcanvas').click()
  }

  return { closeOffcanvas }
}
