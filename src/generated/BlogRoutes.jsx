// AUTO-GENERATED — do not edit manually.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogList from '../pages/BlogList.jsx';
import Blog_gps_lies from '../pages/blogs/Blog_gps_lies.jsx';

export default function BlogRoutes() {
  return (
    <Routes>
      <Route index element={<BlogList />} />
      <Route path="gps_lies" element={<Blog_gps_lies />} />
    </Routes>
  );
}
