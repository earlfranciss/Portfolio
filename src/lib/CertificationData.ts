import { Certificates } from "@/components/CertificationCard";

export const CertificationData: Certificates[] = [
  {
    id: 1,
    title: "Microsoft Certified: Azure Administrator Associate",
    skills: [
      "Virtual Machines",
      "Networking",
      "Storage",
      "Entra ID",
      "Monitoring",
      "RBAC",
      "Backup & Recovery",
    ],
    date: "April 2027",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/EarlFrancisOng-3789/999EBE54C60089D9?sharingId=E97EBE35F0CCB2BE",
    image: "/assets/Certificates/az-104.png",
    badge: "AZ 104",
    issuer: "Microsoft",
  },
  {
    id: 2,
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    skills: [
      "Architecture",
      "High Availability",
      "Disaster Recovery",
      "Cost Optimization",
      "Hybrid Cloud",
      "Scalability",
      "Security",
    ],
    date: "May 2027",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/EarlFrancisOng-3789/D215851F67C9BE98?sharingId=E97EBE35F0CCB2BE",
    image: "/assets/Certificates/az-305.png",
    badge: "AZ 305",
    issuer: "Microsoft",
  },
];