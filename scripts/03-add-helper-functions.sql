-- Function to increment workshop enrolled count
CREATE OR REPLACE FUNCTION increment_workshop_enrolled(workshop_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE workshops
  SET enrolled = enrolled + 1
  WHERE id = workshop_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
