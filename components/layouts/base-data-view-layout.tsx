"use client"

import { Card } from "@/components/ui/card"

interface BaseDataViewLayoutProps {
  children: React.ReactNode;
}

export function BaseDataViewLayout({ children }: BaseDataViewLayoutProps) {
  return (
    <div className="container mx-auto p-6">
      <Card className="overflow-hidden">
        <div className="p-6">
          {children}
        </div>
      </Card>
    </div>
  );
}