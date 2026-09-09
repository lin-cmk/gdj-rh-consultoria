import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isConfigured) {
  console.warn(
    'Variáveis do Supabase não configuradas (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
    'Formulários que dependem do Supabase não vão funcionar até isso ser configurado.'
  )
}

function stubError() {
  return { message: 'Supabase não configurado neste ambiente.' }
}

function stubResultBuilder() {
  const result = Promise.resolve({ data: null, error: stubError() })
  result.select = () => stubResultBuilder()
  result.single = () => Promise.resolve({ data: null, error: stubError() })
  return result
}

const stubClient = {
  from() {
    return {
      insert: () => stubResultBuilder(),
    }
  },
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : stubClient
