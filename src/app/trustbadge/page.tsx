"use client";

import React, { useEffect } from "react";
import { loadMioDottoreWidget } from "@/lib/miodottore-widget";

const TrustBadge = () => {
  useEffect(() => {
    loadMioDottoreWidget();
  }, []);

  return (
    <section className="border-2 border-red-500">
      <h1 className="font-family-open-sans mx-auto w-fit border-2 border-red-500 text-center text-2xl font-bold text-[#2B3A54] sm:text-4xl md:text-left">
        <span className="font-family-open-sans items-center text-center text-2xl font-bold text-[#2B3A54] sm:text-4xl md:text-left">
          COSA DICONO I MIEI PAZIENTI:
        </span>
      </h1>
      <div className="mx-auto w-fit border-2 border-red-500">
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
    </section>
  );
};

export default TrustBadge;
