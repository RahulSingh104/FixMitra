export function useToast() {
  return {
    toast: ({ title }) => {
      alert(title)
    },
  }
}
