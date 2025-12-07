import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://ntgooxvjsubrwovigqsd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Z29veHZqc3VicndvdmlncXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMTg3NTIsImV4cCI6MjA4MDY5NDc1Mn0.NpJyOjIDlELMS367IQHYzKYaIbl-hYd1rPRTC-xphOk" 
);
