import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gletagbfbveivxezahqy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZXRhZ2JmYnZlaXZ4ZXphaHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMzE1MjYsImV4cCI6MjA2NDYwNzUyNn0.-ZKpwfyw0u4QYVl3pMaGah9UPj4Ox2zC1V6jap-ZHA8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})