import { validateForm, submitLink, buildPayload } from "../handlers/formHandlers"

export default function useSubmit({ formState, setFormState, inputRef }) {
  return async (e) => {
    e.preventDefault()

    const error = validateForm(formState)
    if (error) {
      setFormState(prev => ({
        ...prev,
        result: { error: error.error },
        validated: true
      }))
      return
    }
    
    setFormState(prev => ({ ...prev, loading: true }))
    
    const payload = buildPayload(formState)
    
    try {
      const data = await submitLink(payload, formState.useCode)
      
      setFormState(prev => ({
        ...prev,
        result: {
          ...data,
          mainColor: prev.mainColor,
          secondaryColor: prev.secondaryColor,
        },
        password: '',
        code: '',
        validated: false,
      }))
      
      inputRef.current?.focus()
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        result: {
          error: error.error || 'Erro de conexão com o servidor'
        }
      }))
    } finally {
      setFormState(prev => ({ ...prev, loading: false }))
    }
  }
}
