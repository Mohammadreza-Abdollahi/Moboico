'use client'
import ArticleItem from "@/components/articles/ArticleItem";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const [articles , setArticles] = useState([]);
  useEffect(()=>{
    fetch("/api/articles")
    .then(res=>res.json())
    .then(data=>setArticles(data))
  },[])
  return (
    <>
      <section className="bg-back-gray pt-8 pb-20">
        <section className="container mx-auto">
          <section className="flex justify-between items-center">
            <div>
              <span className="text-2xl text-slate-800">همه مقالات</span>
            </div>
            <div>
              <span>مرتب بر اساس : </span>
              <select
                name="sorting"
                id="sorting-select"
                className="w-32 text-center text-lg text-slate-700 appearance-none focus:outline-2 focus:outline-pal1-400/20 rounded-sm"
              >
                <option value="latest">جدیدترین</option>
                <option value="most-popular">برپازدیدترین</option>
                <option value="most-tidy">مرتب ترین</option>
              </select>
            </div>
          </section>
          <section className="flex justify-center items-stretch flex-wrap gap-5 mt-10">
            {
              articles.length !== 0 ? (
                articles.map((item) => (
                  <ArticleItem 
                    key={item.id}
                    title={item.title}
                    text={item.text}
                    alt={item.alt_Img}
                    date={item.date}
                    id={item.id}
                    src={item.img}
                  />
                ))
              ) : <Loading/>
            }
          </section>
        </section>
      </section>
    </>
  );
};

export default BlogPage;
