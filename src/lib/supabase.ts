import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadDocument = async (
  file: File,
  userId: string,
  bucket = 'documents'
) => {
  const filePath = `${userId}/${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return { filePath, publicUrl: urlData.publicUrl }
}
