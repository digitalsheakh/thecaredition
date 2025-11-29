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
import { useDeleteShopMutation, useGetShopsQuery } from "@/redux/features/shops/shopApi";
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

interface Shop {
  _id: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
}

type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

export default function ShopManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const { 
    data: shops = { data: [], pagination: { total: 0, totalPages: 0 } }, 
    isLoading, 
    error, 
    refetch 
  } = useGetShopsQuery({
    search: searchTerm,
    page,
    limit
  }, { refetchOnMountOrArgChange: true });

  const [deleteShop, { isLoading: isDeleting }] = useDeleteShopMutation();

  const handleDeleteShop = async () => {
    if (!currentShop) return;
    
    try {
      const res = await deleteShop(currentShop._id).unwrap();
      if(res?.deletedCount > 0){
        toast.success('Shop deleted successfully');
        refetch();
        setIsDeleteDialogOpen(false);
      }
    } catch (error) {
      toast.error('Failed to delete shop');
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

  const openDeleteDialog = (shop: Shop) => {
    setCurrentShop(shop);
    setIsDeleteDialogOpen(true);
  };

  const openContentDialog = (shop: Shop) => {
    setCurrentShop(shop);
    setIsContentDialogOpen(true);
  };

  const openImageDialog = (shop: Shop, index = 0) => {
    setCurrentShop(shop);
    setCurrentImageIndex(index);
    setIsImageDialogOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!currentShop) return;
    
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + currentShop.imageUrls.length) % currentShop.imageUrls.length
      : (currentImageIndex + 1) % currentShop.imageUrls.length;
    
    setCurrentImageIndex(newIndex);
  };

  const columns: ColumnDef<Shop>[] = [
    {
      header: "Date Added",
      accessor: (shop) => (
        <div className="py-3">
          <div className="text-base font-bold text-gray-900 font-rajdhani">
            {moment(shop.createdAt).format("DD MMM YYYY")}
          </div>
          <div className="text-sm text-gray-600 font-rajdhani">
            {moment(shop.createdAt).format("HH:mm")}
          </div>
        </div>
      ),
      className: "w-[15%]"
    },
    {
      header: "Product Images",
      accessor: (shop) => (
        <div className="py-3">
          <div className="flex gap-2">
            {shop.imageUrls.slice(0, 2).map((imageUrl, index) => (
              <div 
                key={index}
                className="relative h-16 w-16 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-red-300 hover:shadow-md transition-all duration-200 overflow-hidden bg-white"
                onClick={() => openImageDialog(shop, index)}
              >
                <Image
                  src={imageUrl} 
                  alt={`${shop.title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 1 && shop.imageUrls.length > 2 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-rajdhani">
                      +{shop.imageUrls.length - 2}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      className: "w-[20%]"
    },
    {
      header: "Product Details",
      accessor: (shop) => (
        <div className="py-3 space-y-2">
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
            <h3 className="text-base font-bold text-gray-900 font-rajdhani mb-1">{shop.title}</h3>
            <p className="text-sm text-gray-600 font-rajdhani line-clamp-2">
              {shop.content ? shop.content.substring(0, 100) + '...' : 'No description available'}
            </p>
          </div>
        </div>
      ),
      className: "w-[45%]"
    },
    {
      header: "Actions",
      accessor: (shop) => (
        <div className="flex gap-2 justify-center py-3">
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
            onClick={() => openContentDialog(shop)}
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Link href={`/dashboard/shop-list/${shop._id}`}>
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
            onClick={() => openDeleteDialog(shop)}
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
            <h1 className="text-2xl font-bold text-gray-900 font-orbitron uppercase tracking-wider">Shop Management</h1>
            <p className="text-sm text-gray-600 mt-2 font-rajdhani">Manage your automotive products and shop items</p>
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
            total: shops.pagination.total
          }}
          placeholder="Search products by title, description, or content..."
        />

      <DataTable<Shop>
        columns={columns}
        data={shops.data}
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
        emptyMessage="No shops found"
        skeletonCount={5}
      />

      <Pagination
        currentPage={page}
        totalPages={shops.pagination.totalPages}
        onPageChange={goToPage}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Shop</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the shop "{currentShop?.title}"? This action cannot be undone.
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
              onClick={handleDeleteShop}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Shop'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Preview Dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentShop?.title}</DialogTitle>
            <DialogDescription>
              Posted on: {moment(currentShop?.createdAt).format("MMMM D, YYYY")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-4">
            {currentShop?.imageUrls.map((imageUrl, index) => (
              <div 
                key={index} 
                className="relative aspect-square rounded-lg overflow-hidden border border-orange-100 cursor-pointer"
                onClick={() => {
                  openImageDialog(currentShop, index);
                  setIsContentDialogOpen(false);
                }}
              >
                <Image
                  src={imageUrl}
                  alt={`${currentShop.title} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div 
            className="prose max-w-none text-orange-900"
            dangerouslySetInnerHTML={{ __html: currentShop?.content || '' }}
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
            {currentShop && (
              <>
                <button
                  className="absolute top-4 left-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
                  onClick={() => navigateImage('prev')}
                  disabled={currentShop.imageUrls.length <= 1}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
                  onClick={() => setIsImageDialogOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <button
                  className="absolute top-4 right-16 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2"
                  onClick={() => navigateImage('next')}
                  disabled={currentShop.imageUrls.length <= 1}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
                
                <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
                  <Image
                    src={currentShop.imageUrls[currentImageIndex]}
                    alt={`${currentShop.title} image ${currentImageIndex + 1}`}
                    width={1200}
                    height={675}
                    className="object-contain max-w-full max-h-[80vh]"
                    priority
                  />
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {currentShop.imageUrls.length}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}