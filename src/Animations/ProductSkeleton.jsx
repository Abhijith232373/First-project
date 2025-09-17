import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="relative bg-gray-200 shadow-md rounded-md overflow-hidden p-4">
      <div className="absolute top-2 left-2">
        <Skeleton width={50} height={20} />
      </div>

      <div className="absolute top-2 right-2">
        <Skeleton circle width={24} height={24} />
      </div>

      <Skeleton height={220} className="mb-4 rounded-md" />

      <Skeleton height={20} width="80%" className="mb-2" />

      <div className="flex gap-2 mb-4">
        <Skeleton height={20} width={60} />
        <Skeleton height={20} width={40} />
      </div>

      <Skeleton height={36} width="100%" />
    </div>
  );
};

export default ProductSkeleton;
