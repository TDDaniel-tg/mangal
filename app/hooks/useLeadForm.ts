import { useState } from 'react'

interface UseLeadFormProps {
  defaultSource?: string
  productId?: string
}

export const useLeadForm = ({ defaultSource = 'website', productId }: UseLeadFormProps = {}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState(defaultSource)

  const openForm = (newSource?: string, newProductId?: string) => {
    if (newSource) setSource(newSource)
    if (newProductId) setSource(`${newSource}-${newProductId}`)
    setIsOpen(true)
  }

  const closeForm = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    source,
    productId,
    openForm,
    closeForm
  }
} 