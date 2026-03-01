// AUTO-GENERATED — do not edit manually.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from '../pages/BlogList.jsx';
import Blog_gps_lies from '../pages/blogs/Blog_gps_lies.jsx';
import Blog_event_driven_security from '../pages/blogs/Blog_event_driven_security.jsx';
import Blog_file_uploads_attack_surface from '../pages/blogs/Blog_file_uploads_attack_surface.jsx';
import Blog_monitoring_without_response from '../pages/blogs/Blog_monitoring_without_response.jsx';
import Blog_ai_as_a_senior_engineer_not_a_code_generator from '../pages/blogs/Blog_ai_as_a_senior_engineer_not_a_code_generator.jsx';

export default function BlogRoutes() {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path="gps_lies" element={<Blog_gps_lies />} />
      <Route path="event_driven_security" element={<Blog_event_driven_security />} />
      <Route path="file_uploads_attack_surface" element={<Blog_file_uploads_attack_surface />} />
      <Route path="monitoring_without_response" element={<Blog_monitoring_without_response />} />
      <Route path="ai_as_a_senior_engineer_not_a_code_generator" element={<Blog_ai_as_a_senior_engineer_not_a_code_generator />} />
    </Routes>
  );
}
