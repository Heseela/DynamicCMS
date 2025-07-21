import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './Layout/layout';
import Pages from './front-pages/pages';
// import EditPage from './components/page-components/Pages/edit-page';
// import PagesList from './components/page-components/Pages/page-list';
import FaqList from './components/page-components/FAQ/faq-list';
import FaqForm from './components/page-components/FAQ/faq-form';
import EditFaq from './components/page-components/FAQ/edit-faq';
// import PageDetail from './components/page-components/PageDetail/page-detail';
import CourseList from './components/page-components/Courses/courses-list';
import CourseForm from './components/page-components/Courses/courses-form';
import EditCourse from './components/page-components/Courses/edit-courses';
import BlogList from './components/page-components/Blogs/blog-list';
import BlogForm from './components/page-components/Blogs/blog-form';
import EditBlog from './components/page-components/Blogs/edit-blog';
import BlogCategoryList from './components/page-components/BlogCategories/category-list';
import EditBlogCategory from './components/page-components/BlogCategories/edit-category';
import JobList from './components/page-components/Jobs/job-list';
import JobForm from './components/page-components/Jobs/job-form';
import EditJob from './components/page-components/Jobs/edit-job';
import SettingView from './components/page-components/GeneralSetting/setting-view';
import GalleryCategoryList from './components/page-components/GalleryCategories/gallery-list';
import EditGalleryCategory from './components/page-components/GalleryCategories/edit-gallery';
import FormForm from './components/page-components/Form/form-form';
import FormList from './components/page-components/Form/form-list';
import EditForm from './components/page-components/Form/edit-form';
import InfoView from './components/page-components/CompanyInformation/info-view';
import HeaderView from './components/page-components/Header/header-view';
import GalleryDetailPage from './components/page-components/GalleryCategories/gallery-detail-page';
import FooterView from './components/page-components/Footer/footer-view';
import PagesList from './components/page-components/PageSection/pages-list';
import PageFormWrapper from './front-pages/page-form-wrapper';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          {/* <Route path="/" element={<LoginLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} /> 
          </Route> */}

          <Route path="/" element={<Layout />}>
            <Route index element={<Pages />} />
            <Route path="pages" element={<PagesList />} />
            {/* <Route path="pages/:id/edit" element={<EditPage />} /> */}
            {/* <Route path="pages/:slug" element={<PageDetail />} /> */}
            <Route path="pages/:slug" element={<PageFormWrapper />} />

            <Route path="faqs" element={<FaqList />} />
            <Route path="faqs/add" element={<FaqForm />} />
            <Route path="faqs/:id/edit" element={<EditFaq />} />

            <Route path="courses" element={<CourseList />} />
            <Route path="courses/add" element={<CourseForm />} />
            <Route path="courses/:slug/edit" element={<EditCourse />} />

            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/add" element={<BlogForm />} />
            <Route path="blogs/:slug/edit" element={<EditBlog />} />

            <Route path="blog-categories" element={<BlogCategoryList />} />
            <Route path="blog-categories/:id/edit" element={<EditBlogCategory />} />

            <Route path="form" element={<FormList />} />
            <Route path="form/add" element={<FormForm />} />
            <Route path="form/:slug/edit" element={<EditForm />} />

            <Route path="general-setting" element={<SettingView />} />

            <Route path="company-info" element={<InfoView />} />

            <Route path="jobs" element={<JobList />} />
            <Route path="jobs/add" element={<JobForm />} />
            <Route path="jobs/:id/edit" element={<EditJob />} />

            <Route path="gallery" element={<GalleryCategoryList />} />
            {/* <Route path="gallery/:id" element={<GalleryCategoryDetails/>} /> */}
            {/* <Route path="gallery" element={<GalleryImageList />} /> */}
            <Route path="gallery/:id" element={<GalleryDetailPage />} />
            <Route path="gallery/:id/edit" element={<EditGalleryCategory />} />

            <Route path="header" element={<HeaderView />} />
            <Route path="footer" element={<FooterView />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);