// Pakistan Provinces → Cities → Hospitals
// Hospitals can be selected from list OR typed manually (custom option)

export type Hospital = {
  name: string
}

export type CityData = {
  name: string
  hospitals: string[]
}

export type ProvinceData = {
  name: string
  cities: CityData[]
}

export const PAKISTAN_DATA: ProvinceData[] = [
  {
    name: "Punjab",
    cities: [
      {
        name: "Lahore",
        hospitals: [
          "Mayo Hospital",
          "Services Hospital",
          "Jinnah Hospital",
          "General Hospital Lahore",
          "Sheikh Zayed Hospital",
          "Doctors Hospital",
          "Ittefaq Hospital",
          "Shaukat Khanum Cancer Hospital",
          "Hameed Latif Hospital",
          "National Hospital",
        ],
      },
      {
        name: "Faisalabad",
        hospitals: [
          "Allied Hospital",
          "DHQ Hospital Faisalabad",
          "Niazi Medical Complex",
          "National Hospital Faisalabad",
          "Aziz Fatima Hospital",
          "Children Hospital Faisalabad",
        ],
      },
      {
        name: "Rawalpindi",
        hospitals: [
          "Holy Family Hospital",
          "Benazir Bhutto Hospital",
          "CMH Rawalpindi",
          "DHQ Hospital Rawalpindi",
          "Railway Hospital Rawalpindi",
          "Cantonment General Hospital",
        ],
      },
      {
        name: "Gujranwala",
        hospitals: [
          "DHQ Hospital Gujranwala",
          "Gondal Hospital",
          "Aziz Hospital",
          "Bismillah Hospital",
        ],
      },
      {
        name: "Multan",
        hospitals: [
          "Nishtar Hospital",
          "Children Hospital Multan",
          "DHQ Hospital Multan",
          "CMH Multan",
          "Ibn-e-Sina Hospital",
        ],
      },
      {
        name: "Sialkot",
        hospitals: [
          "Allama Iqbal Memorial Hospital",
          "DHQ Hospital Sialkot",
          "CMH Sialkot",
          "Aziz Bhatti Shaheed Hospital",
        ],
      },
      {
        name: "Bahawalpur",
        hospitals: [
          "Bahawal Victoria Hospital",
          "DHQ Hospital Bahawalpur",
          "Children Hospital Bahawalpur",
        ],
      },
      {
        name: "Sargodha",
        hospitals: [
          "DHQ Hospital Sargodha",
          "Fatima Jinnah Hospital",
          "Combined Military Hospital Sargodha",
        ],
      },
      {
        name: "Sheikhupura",
        hospitals: [
          "DHQ Hospital Sheikhupura",
          "THQ Hospital Sheikhupura",
        ],
      },
      {
        name: "Jhang",
        hospitals: [
          "DHQ Hospital Jhang",
          "Civil Hospital Jhang",
        ],
      },
    ],
  },
  {
    name: "Sindh",
    cities: [
      {
        name: "Karachi",
        hospitals: [
          "Aga Khan University Hospital",
          "Jinnah Postgraduate Medical Centre",
          "Civil Hospital Karachi",
          "Liaquat National Hospital",
          "South City Hospital",
          "Indus Hospital",
          "National Medical Centre",
          "Abbasi Shaheed Hospital",
          "Ziauddin Hospital",
          "Patel Hospital",
          "Sina Health City",
          "Dow University Hospital",
        ],
      },
      {
        name: "Hyderabad",
        hospitals: [
          "Liaquat University Hospital",
          "Civil Hospital Hyderabad",
          "Qasimabad Hospital",
          "Isra University Hospital",
        ],
      },
      {
        name: "Sukkur",
        hospitals: [
          "DHQ Hospital Sukkur",
          "Civil Hospital Sukkur",
          "Ghulam Muhammad Mahar Medical College Hospital",
        ],
      },
      {
        name: "Larkana",
        hospitals: [
          "Chandka Medical College Hospital",
          "Civil Hospital Larkana",
          "DHQ Hospital Larkana",
        ],
      },
      {
        name: "Nawabshah",
        hospitals: [
          "People's Medical College Hospital",
          "Civil Hospital Nawabshah",
        ],
      },
      {
        name: "Mirpur Khas",
        hospitals: [
          "Civil Hospital Mirpur Khas",
          "DHQ Hospital Mirpur Khas",
        ],
      },
    ],
  },
  {
    name: "Khyber Pakhtunkhwa",
    cities: [
      {
        name: "Peshawar",
        hospitals: [
          "Hayatabad Medical Complex",
          "Lady Reading Hospital",
          "Khyber Teaching Hospital",
          "Northwest General Hospital",
          "Pakistan Railway Hospital",
          "CMH Peshawar",
          "Rehman Medical Institute",
        ],
      },
      {
        name: "Abbottabad",
        hospitals: [
          "Ayub Medical Complex",
          "DHQ Hospital Abbottabad",
          "CMH Abbottabad",
          "Pakistan Institute of Medical Sciences Abbottabad",
        ],
      },
      {
        name: "Mardan",
        hospitals: [
          "Mardan Medical Complex",
          "DHQ Hospital Mardan",
          "Civil Hospital Mardan",
        ],
      },
      {
        name: "Swat",
        hospitals: [
          "Saidu Group of Teaching Hospital",
          "DHQ Hospital Swat",
          "Civil Hospital Mingora",
        ],
      },
      {
        name: "Dera Ismail Khan",
        hospitals: [
          "DHQ Hospital D.I. Khan",
          "Gomal Medical College Hospital",
          "Civil Hospital D.I. Khan",
        ],
      },
      {
        name: "Kohat",
        hospitals: [
          "DHQ Hospital Kohat",
          "Kohat Institute of Medical Sciences Hospital",
          "CMH Kohat",
        ],
      },
      {
        name: "Bannu",
        hospitals: [
          "DHQ Hospital Bannu",
          "Civil Hospital Bannu",
        ],
      },
    ],
  },
  {
    name: "Balochistan",
    cities: [
      {
        name: "Quetta",
        hospitals: [
          "Sandeman Provincial Hospital",
          "Bolan Medical Complex",
          "Civil Hospital Quetta",
          "CMH Quetta",
          "Fatima Jinnah General Hospital",
        ],
      },
      {
        name: "Turbat",
        hospitals: [
          "DHQ Hospital Turbat",
          "Civil Hospital Turbat",
        ],
      },
      {
        name: "Khuzdar",
        hospitals: [
          "DHQ Hospital Khuzdar",
          "Civil Hospital Khuzdar",
        ],
      },
      {
        name: "Gwadar",
        hospitals: [
          "DHQ Hospital Gwadar",
          "Civil Hospital Gwadar",
          "CPEC Hospital Gwadar",
        ],
      },
      {
        name: "Sibi",
        hospitals: [
          "Civil Hospital Sibi",
          "DHQ Hospital Sibi",
        ],
      },
    ],
  },
  {
    name: "Islamabad Capital Territory",
    cities: [
      {
        name: "Islamabad",
        hospitals: [
          "Pakistan Institute of Medical Sciences (PIMS)",
          "Polyclinic Hospital",
          "Shifa International Hospital",
          "Federal Government Poly Clinic",
          "Quaid-e-Azam International Hospital",
          "CMH Rawalpindi (near Islamabad)",
          "Maroof International Hospital",
          "Ali Medical Centre",
          "Capital Hospital",
          "KRL Hospital",
        ],
      },
    ],
  },
  {
    name: "Azad Jammu & Kashmir",
    cities: [
      {
        name: "Muzaffarabad",
        hospitals: [
          "Azad Kashmir Combined Military Hospital",
          "DHQ Hospital Muzaffarabad",
          "Abbas Institute of Medical Sciences",
        ],
      },
      {
        name: "Mirpur",
        hospitals: [
          "DHQ Hospital Mirpur",
          "Civil Hospital Mirpur",
          "Mirpur Teaching Hospital",
        ],
      },
      {
        name: "Rawalakot",
        hospitals: [
          "DHQ Hospital Rawalakot",
          "Civil Hospital Rawalakot",
        ],
      },
    ],
  },
  {
    name: "Gilgit-Baltistan",
    cities: [
      {
        name: "Gilgit",
        hospitals: [
          "DHQ Hospital Gilgit",
          "Aga Khan Health Services Hospital",
          "Civil Hospital Gilgit",
        ],
      },
      {
        name: "Skardu",
        hospitals: [
          "DHQ Hospital Skardu",
          "Civil Hospital Skardu",
        ],
      },
      {
        name: "Hunza",
        hospitals: [
          "Aga Khan Health Services Hunza",
          "DHQ Hospital Karimabad",
        ],
      },
    ],
  },
]

// Helper: get cities for a province
export function getCitiesByProvince(provinceName: string): CityData[] {
  const province = PAKISTAN_DATA.find(p => p.name === provinceName)
  return province?.cities ?? []
}

// Helper: get hospitals for a city in a province
export function getHospitalsByCity(provinceName: string, cityName: string): string[] {
  const cities = getCitiesByProvince(provinceName)
  const city = cities.find(c => c.name === cityName)
  return city?.hospitals ?? []
}

export const PROVINCE_NAMES = PAKISTAN_DATA.map(p => p.name)
