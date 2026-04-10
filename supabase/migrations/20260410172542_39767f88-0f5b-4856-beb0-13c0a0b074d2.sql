
DROP POLICY "Anyone can send a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can send a contact message" ON public.contact_messages
  FOR INSERT WITH CHECK (
    length(name) > 0 AND length(email) > 3 AND length(message) > 0
  );
