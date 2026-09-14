import type { Donor } from "../../types/donor"

type DonorFilters = {
  bloodGroup: string
  city: string
  availability: string
}

export function filterDonors(
  donors: Donor[],
  filters: DonorFilters
): Donor[] {
  return donors.filter((donor) => {
    const bloodMatch =
      filters.bloodGroup === "All" ||
      donor.bloodGroup === filters.bloodGroup

    const cityMatch =
      filters.city.trim() === "" ||
      donor.city
        .toLowerCase()
        .includes(filters.city.toLowerCase())

    const availabilityMatch =
      filters.availability === "all" ||
      (filters.availability === "available" && donor.available)

    return (
      bloodMatch &&
      cityMatch &&
      availabilityMatch
    )
  })
}