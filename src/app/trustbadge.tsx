"use client";

import React, { useEffect } from "react";
import { loadMioDottoreWidget } from "@/lib/miodottore-widget";
import Carousel from "@/components/ui/carousel";

const TrustBadge = () => {
  useEffect(() => {
    loadMioDottoreWidget();
  }, []);

  return (
    <section className="overflow-hidden md:mt-[140px] lg:mt-[60px]">
      <h1 className="font-family-open-sans mb-8 px-8 pt-20 text-center text-2xl font-bold sm:text-4xl">
        Cosa dicono i miei pazienti
      </h1>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-4 lg:px-8 lg:pr-0">
        <div className="">
          <a
            id="zl-url"
            className="zl-url"
            href="https://www.miodottore.it/federico-benni/fisioterapista/bologna"
            rel="nofollow"
            data-zlw-doctor="federico-benni"
            data-zlw-type="certificate"
            data-zlw-opinion="false"
            data-zlw-hide-branding="true"
            data-zlw-saas-only="true"
            data-zlw-a11y-title="Widget di prenotazione visite mediche"
          >
            Federico Benni - MioDottore.it
          </a>
        </div>
        <Carousel />
      </div>
    </section>
  );
};

export default TrustBadge;
