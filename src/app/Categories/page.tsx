import Dashboard from "@/components/custom/contents/DashBoard";
import Header from "@/components/custom/Header";
import SideNavBar from "@/components/custom/SideNavBar";
import { Separator } from "@radix-ui/react-separator";
import * as React from "react";
import ListCategories from "@/components/custom/contents/Categories/ListCategories";
export default function Categories() {
  return (
    <section className="p-4 m-10 overflow-auto">
      <div className="col-span-3">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-12">
          Liste des Categories
        </h3>
        <ListCategories />
      </div>
    </section>
  );
}
