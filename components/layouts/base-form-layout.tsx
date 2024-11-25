"use client"

import { Card } from "@/components/ui/card"

interface BaseFormLayoutProps {
  children: React.ReactNode;
}

export function BaseFormLayout({ children }: BaseFormLayoutProps) {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <div className="space-y-6">
          {children}
        </div>
      </Card>
    </div>
  );
}