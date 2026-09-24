export const boeResponse = {
  data: "",
  status: 0,
  isLoading: true,
};

export const fetchIndexData = async () => {
  const request = await fetch(
    "https://boe.es/datosabiertos/api/legislacion-consolidada/id/BOE-A-1978-31229/texto/indice",
    {
      headers: {
        Accept: "application/xml",
      },
    },
  );
  try {
    const response = await request.text();
    boeResponse.data = response;
    boeResponse.status = request.status;
    boeResponse.isLoading = false;
  } catch (error) {
    console.error(error);
  }
};
