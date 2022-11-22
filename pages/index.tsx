import Head from "next/head";
import Image from "next/image";
import InfoAboutProduct from "../modules/InfoAboutProduct";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Teilor</title>
      </Head>
      <Image
        src="/ringPhoto.webp"
        alt="Picture of the ring"
        width={450}
        height={500}
        style={{ borderRadius: "20px" }}
      />
      <InfoAboutProduct />
    </div>
  );
}
