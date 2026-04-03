export const members = [
  {
    name: "Muhammad Ruzbehan Baqli",
    npm: "2306245062",
    role: "Project Manager",
    email: "baqliruzbehan@gmail.com",
    description: "Expert in project coordination and security principles.",
    image: "/images/ruzbehan.jpg"
  },
  {
    name: "Omar Suyuf Wicaksono",
    npm: "2406421200",
    role: "Frontend Developer",
    email: "omarsuyufw@gmail.com",
    description: "Creating beautiful and secure user interfaces.",
    image: "/images/omar.jpg"
  },
  {
    name: "Pradipta Wachyu Aditama",
    npm: "2306226233",
    role: "Security Analyst",
    email: "pradiptaadinugroho@gmail.com",
    description: "Analyzing vulnerabilities and implementing best practices.",
    image: "/images/adi.jpg"
  },
  {
    name: "Z Arsy Alam Sin",
    npm: "2406495836",
    role: "Backend Specialist",
    email: "zarsy1100@gmail.com",
    description: "Focused on secure API design and database management.",
    image: "/images/zarsy.png"
  }
];

export const isAuthorized = (email) => {
  const auths = process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS?.split(",") || [];
  return auths.map(e => e.trim().toLowerCase()).includes(email?.toLowerCase());
};
