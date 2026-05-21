import { Certificates } from "@/components/CertificationCard";

export const CertificationData: Certificates[] = [
  {
    id: 1,
    title: "Microsoft Certified: Azure Administrator Associate",
    skills: [
      "Azure Virtual Machines",
      "Azure Networking",
      "Azure Storage",
      "Microsoft Entra ID",
      "Azure Monitoring",
      "RBAC",
      "Backup & Recovery",
    ],
    date: "April 15, 2026 - April 16, 2027",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/EarlFrancisOng-3789/999EBE54C60089D9?sharingId=E97EBE35F0CCB2BE",
    image: "/assets/Certificates/az104.png",
    badge: "AZ-104",
    issuer: "Microsoft",
  },
  {
    id: 2,
    title: "Microsoft Certified: Azure Solutions Architect Expert",
    skills: [
      "Cloud Architecture",
      "High Availability",
      "Disaster Recovery",
      "Cost Optimization",
      "Hybrid Cloud",
      "Scalability",
      "Azure Security",
    ],
    date: "May 21, 2026 - May 22, 2027",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/EarlFrancisOng-3789/D215851F67C9BE98?sharingId=E97EBE35F0CCB2BE",
    image: "/assets/Certificates/az305.png",
    badge: "AZ-305",
    issuer: "Microsoft",
  },
];