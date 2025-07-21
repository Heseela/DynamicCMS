// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { toast } from 'react-hot-toast';
// import { Form } from '../components/ui/form';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// import { Button } from '../components/ui/button';
// import { useGetPage, useUpdatePage } from '../components/page-components/PageSection/api/page';
// import { PageDtoSchema, type TPageDto } from '../Models/page.model';
// import Loading from '../Global/loader';
// import ErrorMessage from '../Global/error-message';
// import ContentTabContent from '../components/page-components/PageSection/tabs/content-tab-content';
// import HeroTabContent from '../components/page-components/PageSection/tabs/hero-tab-content';
// import SeoTabContent from '../components/page-components/PageSection/tabs/seo-tab-content';

// export default function PageDetail({ slug }: { slug: string }) {
//   const { data: page, isLoading, isError, error } = useGetPage(slug);
//   const { mutate: updatePage, isPending } = useUpdatePage();
  
//   const form = useForm<TPageDto>({
//     resolver: zodResolver(PageDtoSchema),
//     defaultValues: {
//       name: '',
//       sections: [{
//         headline: '',
//         subheadline: '',
//         blocks: {
//           direction: 'horizontal',
//           items: []
//         }
//       }],
//       heroSections: [],
//       metadata: {
//         title: '',
//         description: '',
//         keywords: []
//       },
//       ...page 
//     }
//   });

//   const onSubmit = (data: TPageDto) => {
//     updatePage({ slug, data }, {
//       onSuccess: () => {
//         toast.success('Page updated successfully');
//       },
//       onError: (error) => {
//         toast.error(error.message || 'Failed to update page');
//       }
//     });
//   };

//   if (isLoading) return <Loading />;
//   if (isError) return <ErrorMessage error={error} />;

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Page Name</label>
//           <input
//             {...form.register('name')}
//             className="w-full p-3 border rounded-md"
//             placeholder="Enter page name"
//           />
//           {form.formState.errors.name && (
//             <p className="text-sm text-red-500">
//               {form.formState.errors.name.message}
//             </p>
//           )}
//         </div>

//         <Tabs defaultValue="content" className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="content">Content</TabsTrigger>
//             <TabsTrigger value="hero">Hero</TabsTrigger>
//             <TabsTrigger value="seo">SEO</TabsTrigger>
//           </TabsList>

//           <div className="pt-6">
//             <TabsContent value="content">
//               <ContentTabContent />
//             </TabsContent>

//             <TabsContent value="hero">
//               <HeroTabContent />
//             </TabsContent>

//             <TabsContent value="seo">
//               <SeoTabContent />
//             </TabsContent>
//           </div>
//         </Tabs>

//         <div className="flex justify-end">
//           <Button type="submit" disabled={isPending}>
//             {isPending ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }