"use client"

import CertificationCard from "@/components/CertificationCard";
import { CertificationData } from "../../lib/CertificationData"
import { motion } from "motion/react";
import Separator from "@/components/Separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Award, BookOpen, Briefcase } from "lucide-react";

export default function CredentialsPage() {
  const certifications = [
    {
      title: "Microsoft Certified: Azure Administrator Associate",
      issuer: "Microsoft",
      year: "2026",
      badge: "AZ-104",
    },
    {
      title: "Microsoft Certified: Azure Solutions Architect Expert",
      issuer: "Microsoft",
      year: "In Progress",
      badge: "AZ-305",
    },
    {
      title: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
      issuer: "Microsoft",
      year: "Completed",
      badge: "SC-900",
    },
  ];

  const skills = [
    "Azure (Compute, Networking, Storage)",
    ".NET / ASP.NET Core",
    "React / Next.js",
    "TypeScript / JavaScript",
    "CI/CD (GitHub Actions, Azure DevOps)",
    "Docker & Containerization",
    "SQL / MongoDB",
    "Cloud Architecture Design",
  ];
  const achievements = [
    "Designed and deployed cloud-based applications on Azure",
    "Built production-ready full-stack applications",
    "Implemented secure authentication and identity solutions",
    "Improved system performance through optimized architecture",
  ];

  return (
        <section id="certificates" className="scroll-mt-24 relative space-y-6 pt-6 pb-8">
          {/* Gradient top border */}
          <Separator />
        
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }} className=" text-xl sm:text-2xl font-semibold sm:font-bold text-center">Certifications</motion.h2>
       
        <div className="flex flex-col">
            {CertificationData.map((cert) => (
                <CertificationCard key={cert.id} {...cert} />
            ))}
        </div>



     </section>
  );
}