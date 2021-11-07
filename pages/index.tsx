import type { GetStaticProps, NextPage } from "next";
import NavFooter from "@components/NavFooter";
// import Head from 'next/head'
// import Image from 'next/image'

const HomePage: NextPage = () => {
  return <NavFooter>hello</NavFooter>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default HomePage;
