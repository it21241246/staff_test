import React, { useEffect, useState } from "react";
import axios from "axios";

function GenReport() {
  axios
    .get("http://localhost:8070/student/report", {
      responseType: 'blob',
    })
    .then((res) => {
      const url = window.URL.createObjectURL(res.data);
      const link = document.createElement('a');
      const currentDate = new Date().toISOString().slice(0,10);
      link.href = url;
      link.setAttribute('download', `inventory_report_${currentDate}.pdf`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.log(error);
    });
}

export default GenReport;