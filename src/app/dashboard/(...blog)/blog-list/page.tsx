'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  ArrowPathIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import moment from "moment";
import { useDeleteBlogMutation, useGetBlogsQuery } from "@/redux/features/blogs/blogApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from '@/components/reuseableComponents/Tables/reuseableHeader';
import { DataTable } from '@/components/reuseableComponents/Tables/reuseableTable';
import { Pagination } from '@/components/reuseableComponents/Tables/reuseablePagination';
import { Button } from '@/components/ui/button';

interface Blog {
  _id: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrl: string;
}

type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function BlogManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const { 
    data: blogs = { data: [], pagination: { total: 0, totalPages: 0 } }, 
    isLoading, 
    error, 
    refetch 
  } = useGetBlogsQuery({
    search: searchTerm,
    page,
    limit
  }, { refetchOnMountOrArgChange: true });

  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDeleteBlog = async () => {
    if (!currentBlog) return;
    
    try {
      const res = await deleteBlog(currentBlog._id).unwrap();
      if(res?.deletedCount > 0){
        toast.success('Blog deleted successfully');
        refetch();
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      toast.error('Failed to delete blog');
      console.error('Delete error:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const openDeleteDialog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const openContentDialog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsContentDialogOpen(true);
  };

  const openImageDialog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsImageDialogOpen(true);
  };

  const columns: ColumnDef<Blog>[] = [
    {
      header: "Date Added",
      accessor: (blog) => (
        <div className="py-3">
          <div className="text-base font-bold text-gray-900 font-rajdhani">
            {moment(blog.createdAt).format("DD MMM YYYY")}
          </div>
          <div className="text-sm text-gray-600 font-rajdhani">
            {moment(blog.createdAt).format("HH:mm")}
          </div>
        </div>
      ),
      className: "w-[15%]"
    },
    {
      header: "Article Image",
      accessor: (blog) => (
        <div className="py-3">
          <div 
            className="relative h-16 w-24 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-md transition-all duration-200 overflow-hidden bg-white"
            onClick={() => openImageDialog(blog)}
          >
            <Image
              src={blog.imageUrl || "/placeholder-image.jpg"} 
              alt={blog.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
              <EyeIcon className="h-5 w-5 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
      ),
      className: "w-[20%]"
    },
    {
      header: "Article Details",
      accessor: (blog) => (
        <div className="py-3 space-y-2">
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
            <h3 className="text-base font-bold text-gray-900 font-rajdhani mb-1">{blog.title}</h3>
            <p className="text-sm text-gray-600 font-rajdhani line-clamp-2">
              {blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'No content available'}
            </p>
          </div>
        </div>
      ),
      className: "w-[45%]"
    },
    {
      header: "Actions",
      accessor: (blog) => (
        <div className="flex gap-2 justify-center py-3">
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
            onClick={() => openContentDialog(blog)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Link href={`/dashboard/blog-list/${blog._id}`}>
            <Button
              variant="outline"
              size="icon"
              className="text-orange-600 border-orange-200 hover:bg-orange-100 hover:text-orange-700"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
            onClick={() => openDeleteDialog(blog)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <TrashIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
      className: "w-[20%] text-center"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-red-100/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Blog Management</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Manage your automotive blog articles and content</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          heading=""
          onSubmit={handleSearch}
        isLoading={isLoading}
        limit={limit}
        onLimitChange={handleLimitChange}
        pagination={{
          page: page,
          total: blogs.pagination.total
        }}
      />

      <DataTable<Blog>
        columns={columns}
        data={blogs.data}
        isLoading={isLoading}
        error={
          error
            ? typeof error === "string"
              ? error
              : "status" in (error as any)
                ? `Error: ${(error as any).status}`
                : "An error occurred"
            : undefined
        }
        emptyMessage="No blogs found"
        skeletonCount={5}
      />

      <Pagination
        currentPage={page}
        totalPages={blogs.pagination.totalPages}
        onPageChange={goToPage}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the blog "{currentBlog?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteBlog}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Blog'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Preview Dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentBlog?.title}</DialogTitle>
            <DialogDescription>
              Posted on: {moment(currentBlog?.createdAt).format("MMMM D, YYYY")}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-orange-100 my-4">
            <Image
              src={currentBlog?.imageUrl || ''}
              alt={currentBlog?.title || 'Blog thumbnail'}
              fill
              className="object-cover"
            />
          </div>
          <div 
            className="prose max-w-none text-orange-900"
            dangerouslySetInnerHTML={{ __html: currentBlog?.content || '' }}
          />
          <DialogFooter>
            <Button onClick={() => setIsContentDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <button
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
              onClick={() => setIsImageDialogOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
              {currentBlog && (
                <Image
                  src={currentBlog.imageUrl}
                  alt={currentBlog.title}
                  width={1200}
                  height={675}
                  className="object-contain max-w-full max-h-[80vh]"
                  priority
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}