import { useState, useCallback, useRef, useEffect } from "react";
import style from "../modules/InfoProduct.module.css";
import emailjs from "@emailjs/browser";

type ResponseType = {
  CodProdus: string;
  Stoc: string;
  adresa: string;
  id_magazin: string;
  magazin: string;
  oras: string;
  regiune: string;
  stocrezComFurnizori: string;
  url_site: string;
};

export default function InfoAboutProduct() {
  const [dataFromApi, setDataFromApi] = useState<ResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddressInfo, setShowAddressInfo] = useState<string>("");

  const sendEmail = () => {
    emailjs
      .send(
        "service_tvimqsk",
        "template_dg8p9d5",
        {
          email: "george.petraru@teilor.ro",
          message: `You can find the product with the id: 124091 in the following stores: 
          ${dataFromApi?.map((eachEntry) => eachEntry?.magazin).join()} `,
          subject: "Product Availability",
        },
        "LfApdCevkLglp0REq"
      )
      .then(
        () => {
          alert("An Email was sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    await fetch(
      "https://smeurei.teilor.ro/service/stoc_magazin?cod_produs=124091",
      {
        method: "get",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setDataFromApi(result?.rows);
        setShowAddressInfo(result?.rows?.[0]?.id_magazin);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (dataFromApi?.length > 0) {
      sendEmail();
    }
  }, [dataFromApi]);

  return (
    <div className={style.infoContainer}>
      <h1>Special Ring</h1>
      <h3>3000 RON</h3>
      <h2>Product Description</h2>
      <p>
        If you're a fan of big, glamorous rings than one like this braided
        beauty is exactly what you need! With more diamonds than you can count
        scattered all across this band and a large center diamond, this ring has
        all the sparkle and shine you could ever hope for!
      </p>
      <div>
        <button type="button" onClick={getData} className={style.checkButton}>
          Check product Availability
        </button>
      </div>
      {isLoading && (
        <div className={style.loaderContainer}>
          <div className={style.loader} />
        </div>
      )}
      {dataFromApi?.length !== 0 && (
        <div className={style.listAvailability}>
          {dataFromApi?.map((eachStore) => {
            return (
              <div key={eachStore?.id_magazin} className={style.storeAddress}>
                <a
                  className={style.storeCard}
                  onMouseOver={() => setShowAddressInfo(eachStore?.id_magazin)}
                  href={eachStore?.url_site}
                  target="_blank"
                >
                  {eachStore?.oras}
                </a>
                {showAddressInfo === eachStore?.id_magazin && (
                  <div>{eachStore?.adresa}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
