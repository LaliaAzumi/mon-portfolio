"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
  Code,
  Database,
  Globe,
  Server,
  FileDown,
  BookText,
  Languages,
} from "lucide-react"
import ParchmentBackground from "@/components/parchment-background"
import PageTurn from "@/components/page-turn"
import InkEffect from "@/components/ink-effect"
import { useInView } from "@/hooks/use-in-view"
import Navbar from "@/components/navbar"
import ExperienceCard from "@/components/experience-card"
import ProjectModal, { type ProjectDetails } from "@/components/project-modal"
import ContactForm from "@/components/contact-form"
// Définition des projets avec détails complets
const projectsData: ProjectDetails[] = [
  {
    id: "fleet-management",
    title: "Fleet Management",
    description: "Une application web permettant de gérer la flotte automobile de l'entreprise S2M",
    longDescription:
      "Cette application permet de gérer l'ensemble de la flotte automobile de l'entreprise S2M, incluant la maintenance, les réservations, le suivi des trajets et la gestion des conducteurs. Elle intègre également un système de prédiction de maintenance basé sur l'apprentissage automatique.",
    features: [
      "Gestion des véhicules et de leur maintenance",
      "Système de réservation pour les employés",
      "Suivi des trajets et de la consommation de carburant",
      "Tableau de bord analytique avec statistiques",
      "Prédiction de maintenance préventive avec RandomForest",
    ],
    technologies: ["Django", "MySQL", "Bootstrap", "Ajax/JQuery", "RandomForest", "Scikit-learn"],
    images: [
      { src: "/fleet.png", alt: "Fleet Management Dashboard" },
      { src: "/flotteConso.jpg", alt: "Consommation" },
      { src: "/flotteIA.jpg", alt: "Recommandation IA" },
      { src: "/flotteMaintenance.jpg", alt: "Maintenance" },
      { src: "/flotteMission.jpg", alt: "Planification mission" },
    ],
    tags: ["Django", "MySQL", "Bootstrap", "RandomForest", "Scikit-learn"],
    codeUrl: "#",
    demoUrl: "#",
    variant: "mechanical",
  },
  {
    id: "omarmit",
    title: "Ô'Marmit",
    description: "Plateforme de partage de recettes de cuisine",
    longDescription:
      "Ô'Marmit est une plateforme de partage de recettes de cuisine où les utilisateurs peuvent découvrir, partager et sauvegarder leurs recettes préférées. Le site propose des fonctionnalités de recherche avancée, de filtrage par ingrédients et de création de collections personnalisées.",
    features: [
      "Création et partage de recettes avec photos",
      "Recherche avancée par ingrédients, temps de préparation, etc.",
      "Collections de recettes personnalisées",
      "Interface  utilisateur intuitive",
    ],
    technologies: ["Flask", "MySQL", "Bootstrap", "JavaScript", "SQLAlchemy"],
    images: [
      { src: "/recette2.png?height=400&width=600", alt: "Page d'accueil Ô'Marmit" },
      { src: "/detail.png?height=400&width=600", alt: "Détail d'une recette" },
      { src: "/recette.png?height=400&width=600", alt: "Authentification" },
      { src: "/recette3.png?height=400&width=600", alt: "Ajout recette" },
      { src: "/recette4.png?height=400&width=600", alt: "Liste recette" },
    ],
    tags: ["Bootstrap", "Flask", "MySQL"],
    codeUrl: "#",
    demoUrl: "#",
    variant: "alchemical",
  },
  {
    id: "TaleSync",
    title: "TaleSync – Application web de lecture intelligente et adaptative",
    description:
      "Solution web Django/React dédiée à une lecture adaptée aux personnes en situation de handicap, notamment malvoyantes ou ayant un handicap moteur.",
    longDescription:
      "TaleSync combine l'API Google Gemini et Tesseract OCR pour simplifier les documents, générer des synthèses automatiques et proposer une expérience visuelle plus accessible. Une brique d'intelligence artificielle analyse aussi les erreurs de clic, les usages du zoom et d'autres interactions afin d'orienter automatiquement l'adaptation de l'interface grâce à un arbre de décision.",
    features: [
      "Lecture intelligente et adaptative pour les profils visuel et moteur",
      "Extraction de texte avec Tesseract OCR",
      "Simplification et synthèse automatique avec Google Gemini",
      "Détection des besoins d'accessibilité à partir des interactions",
      "Adaptation de l'ergonomie visuelle avec un arbre de décision",
    ],
    technologies: ["Django", "React", "Python", "Google Gemini API", "Tesseract OCR", "UX/UI Accessibilité", "Arbre de décision"],
    images: [
      { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/talesync1-HswqNwZzl3Fc8XeUIAuGZGGdqFAF7z.png", alt: "AccessiDoc, écran de bibliothèque accessible" },
      { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/talesync2-mgWPvkc2TTTeK74DLiFMNGUfvkIyUr.png", alt: "AccessiDoc, interface de lecture adaptative" },
      { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/talesync3-9S68LTnXJzzgjzRpAABq7LngIHg2zw.png", alt: "AccessiDoc, commandes vocales et navigation" },
      { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/talesync4-40aBchOzjgg7vxbnmd9ldgm9OUSTiD.png", alt: "AccessiDoc, mode visuel à contraste élevé" },
    ],
    tags: ["Django", "React", "Python", "Gemini API", "Tesseract OCR", "Accessibilité", "Arbre de décision"],
    codeUrl: "#",
    demoUrl: "#",
    variant: "alchemical",
  },
  {
    id: "gift",
    title: "G-IFT",
    description: "Site de gestion des impôts fonciers sur le terrain pour la DSI",
    longDescription:
      "G-IFT est une plateforme développée pour la Direction des Services d'Impôts, permettant la gestion et le suivi des impôts fonciers sur les terrains. Elle facilite la déclaration, le calcul et le paiement des impôts fonciers tout en offrant une interface d'administration complète.",
    features: [
      "Enregistrement et gestion des propriétés foncières",
      "Calcul automatique des impôts selon les caractéristiques du terrain",
      "Suivi des paiements et génération de reçus",
      "Interface d'administration pour les agents fiscaux",
      "Génération de rapports et statistiques",
    ],
    technologies: ["PHP", "MySQL", "Bootstrap", "jQuery", "FPDF"],
    images: [
      { src: "/gift.jpg", alt: "Tableau de bord" },
      { src: "/gift4.jpg", alt: "Liste" },
      { src: "/gift1.jpg", alt: "Authentification" },
    ],
    tags: ["PHP", "MySQL", "Bootstrap"],
    codeUrl: "#",
    demoUrl: "#",
    variant: "mechanical",
  },
  
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [pageOpen, setPageOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sectionRefs = {
    home: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    education: useRef(null),
    interests: useRef(null),
    contact: useRef(null),
  }

  // Check which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    Object.values(sectionRefs).forEach((ref) => ref.current && observer.observe(ref.current))

    return () => {
      Object.values(sectionRefs).forEach((ref) => ref.current && observer.unobserve(ref.current))
    }
  }, [])

  // Open the grimoire after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const openProjectModal = (projectId: string) => {
    const project = projectsData.find((p) => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Texture */}
      <ParchmentBackground />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section id="home" ref={sectionRefs.home} className="min-h-screen flex items-center relative py-20">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-block dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] hover:bg-[#1D3E2F]/70 font-serif">
                    Étudiante • Master 1 en informatique appliquée à la gestion d'entreprise
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl dark:text-[#E8D0A9] text-[#6A4423] font-serif drop-shadow-md">
                    <span className="dark:text-[#C17E3C] text-[#8B5A2B] text-7xl mr-2 font-bold">I</span>avo{" "}
                    <span className="dark:text-[#C17E3C] text-[#8B5A2B] text-7xl mr-2 font-bold">L</span>alia{" "}
                    <span className="dark:text-[#C17E3C] text-[#8B5A2B] text-7xl ml-2 mr-2 font-bold">H</span>AJANIRINA
                  </h1>
                  <p className="max-w-[600px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                    Je développe des applications en transformant des idées en outils interactifs, avec du code comme
                    matière première.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    className="dark:bg-[#8B5A2B] dark:hover:bg-[#6A4423] bg-[#C17E3C] hover:bg-[#8B5A2B] dark:text-[#E8D0A9] text-[#F5F1E8] border-none group font-serif"
                  >
                    <Link href="#projects">
                      Consulter mes créations
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="dark:border-[#C17E3C]/50 dark:text-[#C17E3C] border-[#8B5A2B]/50 text-[#8B5A2B] dark:hover:bg-[#C17E3C]/10 hover:bg-[#8B5A2B]/10 dark:hover:text-[#E8D0A9] hover:text-[#6A4423] font-serif"
                  >
                    <a href="/CV_HAJANIRINA_Iavo_Lalia.pdf" download="CV_Iavo_Lalia_HAJANIRINA.pdf">
                      <FileDown className="mr-2 h-4 w-4" />
                      Télécharger mon CV
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Link
                    href="https://github.com/LaliaAzumi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-[#E8D0A9]/70 text-[#6A4423]/70 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dark:text-[#E8D0A9]/70 text-[#6A4423]/70 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="mailto:laliaazumii@gmail.com"
                    className="dark:text-[#E8D0A9]/70 text-[#6A4423]/70 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                  {/* Book cover animation */}
                  <div className="absolute inset-0 w-full h-full">
                    <PageTurn isOpen={pageOpen} />
                  </div>
                  {/* Profile image */}
                  <div className="absolute inset-0 m-auto w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full overflow-hidden dark:border-4 dark:border-[#8B5A2B]/50 border-4 border-[#C17E3C]/50 shadow-lg">
                    <Image src="/pic.jpg" alt="Iavo Lalia" fill className="object-cover" priority />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-1/4 w-8 h-8">
                    <div className="w-full h-full rounded-full dark:border-2 dark:border-[#C17E3C] border-2 border-[#8B5A2B] animate-spin-slow"></div>
                  </div>
                  <div className="absolute bottom-1/4 right-0 w-12 h-12">
                    <div className="w-full h-full rounded-full dark:border-2 dark:border-[#C17E3C] border-2 border-[#8B5A2B] animate-spin-slow animation-delay-500 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full dark:border-2 dark:border-[#8B5A2B] border-2 border-[#C17E3C] animate-spin-reverse"></div>
                    </div>
                  </div>
                  <div className="absolute top-1/3 right-1/4 w-10 h-10">
                    <div className="w-full h-full rounded-full dark:border-2 dark:border-[#C17E3C] border-2 border-[#8B5A2B] animate-spin-slow animation-delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" ref={sectionRefs.experience} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#1D3E2F]/5 bg-[#A3C9A8]/5"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre I
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Expériences Professionnelles
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Les chapitres de mon parcours professionnel, où j'ai forgé mes compétences et relevé des défis.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <ExperienceCard title="Consultante" company="PJL — Projet Jeune Leader" location="Madagascar" period="Juin 2026" description="Imputation de données depuis KoboToolbox vers Google Sheets et traitement de données physiques." skills={["KoboToolbox", "Google Sheets", "Analyse de données"]} variant="mechanical" />
              <ExperienceCard title="Conseillère Client" company="Odity Andraharo" location="Antananarivo, Madagascar" period="Septembre 2025 - Avril 2026" description="Analyse et traitement des opérations back office, appels sortants, gestion des tickets et suivi des dossiers clients jusqu'à leur résolution." skills={["Back office", "Relation client", "Suivi de dossiers"]} variant="alchemical" />
              <ExperienceCard title="Stagiaire" company="S2M" location="Antananarivo, Madagascar" period="Décembre 2024 - Mars 2025" description="Développement et conception d'une application web de gestion de parc automobile." skills={["Django", "MySQL", "Python"]} variant="mechanical" />
              <ExperienceCard title="Stagiaire" company="DSID" location="Antananarivo, Madagascar" period="Mars 2024 - Mai 2024" description="Création et conception d'une application web de gestion des impôts fonciers sur les terrains (G-IFT)." skills={["PHP", "MySQL", "Bootstrap"]} variant="alchemical" />
              <ExperienceCard title="Stagiaire" company="Randevteam" location="Antananarivo, Madagascar" period="Juin 2023 - Août 2023" description="Intégration de sites e-commerce CMS et gestion des produits." skills={["Prestashop", "WordPress", "CMS"]} variant="mechanical" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={sectionRefs.projects} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#2A2522] bg-[#E8D0A9]/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre II
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Créations
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Les pages illustrées de mon parcours, où chaque projet représente une formule que j'ai imaginée et
                  réalisée.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {projectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.images[0].src}
                  tags={project.tags}
                  onView={() => openProjectModal(project.id)}
                  demoUrl={project.demoUrl}
                  variant={project.variant}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={sectionRefs.skills} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#1D3E2F]/5 bg-[#A3C9A8]/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre III
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Compétences
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Les outils et savoirs que j'ai appris à maîtriser au fil de mon apprentissage, comme des runes gravées
                  dans mon parcours.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <SkillCard
                title="Front-end"
                icon={<Code className="h-6 w-6 text-[#C17E3C]" />}
                skills={[
                  { name: "HTML", level: 90, rune: "Rune du Marquage" },
                  { name: "CSS (Bootsrap,Tailwind)", level: 80, rune: "Rune du style" },
                  { name: "JavaScript (React, Next)", level: 70, rune: "Rune du Script" },
                ]}
                variant="mechanical"
              />
              <SkillCard
                title="Back-end"
                icon={<Server className="h-6 w-6 text-[#A3C9A8]" />}
                skills={[
                  { name: "Python (Flask,Django)", level: 80, rune: "Rune du Serpent" },
                  { name: "Java (Swing, JavaFx)", level: 65, rune: "Cristal de Répétition" },
                  { name: "Php (CodeIgniter, Symfony)", level: 70, rune: "Nœud Arcanique" },
                ]}
                variant="alchemical"
              />
              <SkillCard
                title="Bases de données"
                icon={<Database className="h-6 w-6 text-[#C17E3C]" />}
                skills={[
                  { name: "MySQL", level: 80, rune: "Grimoire des Requêtes" },
                  { name: "PostgreSQL", level: 70, rune: "Orbe de Documents" },
                  { name: "SQLite", level: 60, rune: "Flamme Persistante" },
                ]}
                variant="mechanical"
              />
              <SkillCard
                title="Autres"
                icon={<Globe className="h-6 w-6 text-[#A3C9A8]" />}
                skills={[
                  { name: "Git", level: 80, rune: "Compas de Version" },
                  { name: "Photoshop/Illustrateur", level: 50, rune: "Conteneur Mystique" },
                  { name: "IA", level: 55, rune: "Flux Tensoriel" },
                ]}
                variant="alchemical"
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" ref={sectionRefs.education} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#2A2522] bg-[#E8D0A9]/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre IV
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Chroniques Académiques
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Les annales de mon apprentissage, consignées avec soin dans les pages de mon grimoire.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 py-12">
              <TimelineItem
                title="Master 1 — Informatique appliquée à la gestion d'entreprise"
                date="ESMIA | 2026 — En cours"
                description="Après une Licence en Informatique Risque et Décision obtenue à l'ESMIA (2022–2025), je poursuis mon parcours en Master 1."
                badge="En cours"
                variant="mechanical"
              />
              <TimelineItem
                title="Baccalauréat Scientifique"
                date="Lycée Jean Joseph RABEARIVELO | 2019 - 2021"
                description="Série C. Mention Assez Bien."
                variant="alchemical" badge={undefined}              />
              <TimelineItem
                title="Certifications"
                description={<ul className="space-y-2 dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C17E3C]"></span>
                    <strong>Introduction au Design</strong> - Orange Digital Center (2024)
                  </li>
                </ul>}
                variant="mechanical" date={undefined} badge={undefined}   
                    />
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" ref={sectionRefs.interests} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#1D3E2F]/5 bg-[#A3C9A8]/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre V
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Centres d'Intérêt & Langues
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Les passions qui nourrissent mon esprit et les langues qui enrichissent ma communication.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <Card className="dark:bg-[#2A2522] bg-[#F5F1E8] dark:border-[#8B5A2B]/20 border-[#C17E3C]/20 overflow-hidden shadow-md relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
                <CardContent className="p-6 space-y-4 relative">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full dark:bg-[#8B5A2B]/10 bg-[#C17E3C]/10">
                      <BookText className="h-5 w-5 dark:text-[#C17E3C] text-[#8B5A2B]" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                      Mes centres d'intérêt
                    </h3>
                  </div>
                  <ul className="space-y-2 dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#C17E3C] bg-[#8B5A2B]"></span>
                      Lecture
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#A3C9A8] bg-[#7A9E7E]"></span>
                      Jeux vidéos/ jeux de société
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#C17E3C] bg-[#8B5A2B]"></span>
                      Dessin/ Peinture
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#A3C9A8] bg-[#7A9E7E]"></span>
                      Gymnastique
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="dark:bg-[#2A2522] bg-[#F5F1E8] dark:border-[#C17E3C]/20 border-[#8B5A2B]/20 overflow-hidden shadow-md relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
                <CardContent className="p-6 space-y-4 relative">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full dark:bg-[#C17E3C]/10 bg-[#8B5A2B]/10">
                      <Languages className="h-5 w-5 dark:text-[#C17E3C] text-[#8B5A2B]" />
                    </div>
                    <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">Langues</h3>
                  </div>
                  <ul className="space-y-2 dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#C17E3C] bg-[#8B5A2B]"></span>
                      Malgache (Langue maternelle)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#A3C9A8] bg-[#7A9E7E]"></span>
                      Français (Avancée)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full dark:bg-[#C17E3C] bg-[#8B5A2B]"></span>
                      Anglais (Intermédiaire)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={sectionRefs.contact} className="py-20 relative">
          <div className="absolute inset-0 dark:bg-[#1D3E2F]/5 bg-[#A3C9A8]/10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif">
                  Chapitre VI
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                  Contactez-moi
                </h2>
                <p className="max-w-[700px] dark:text-[#E8D0A9]/80 text-[#6A4423]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-serif">
                  Envoyez-moi un message scellé pour discuter de projets ou d'opportunités.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <ContactForm />
              <div className="space-y-4">
                <Card className="dark:bg-[#2A2522] bg-[#F5F1E8] dark:border-[#C17E3C]/20 border-[#8B5A2B]/20 overflow-hidden shadow-md relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
                  <CardContent className="p-6 space-y-4 relative">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">
                        Coordonnées de contact
                      </h3>
                      <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                        Vous pouvez me contacter directement ou via les réseaux sociaux.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#8B5A2B]/10">
                          <Mail className="h-5 w-5 text-[#C17E3C]" />
                        </div>
                        <a
                          href="mailto:laliaazumii@gmail.com"
                          className="text-[#674621]/80 hover:text-[#C17E3C] transition-colors font-serif"
                        >
                          laliaazumii@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#1D3E2F]/30">
                          <Github className="h-5 w-5 text-[#1D3E2F]" />
                        </div>
                        <a
                          href="https://github.com/LaliaAzumi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 dark:hover:text-[#A3C9A8] hover:text-[#7A9E7E] transition-colors font-serif"
                        >
                          github.com/LaliaAzumi
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#8B5A2B]/10">
                          <Linkedin className="h-5 w-5 text-[#C17E3C]" />
                        </div>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors font-serif"
                        >
                          linkedin.com/
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="dark:bg-[#2A2522] bg-[#F5F1E8] dark:border-[#8B5A2B]/20 border-[#C17E3C]/20 overflow-hidden shadow-md relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] opacity-5"></div>
                  <CardContent className="p-6 space-y-4 relative">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">Disponibilité</h3>
                      <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                        Je suis actuellement à la recherche d'un stage, une alternance ou tout autre type permettant
                        d'accroître mes expériences.
                      </p>
                      <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">
                        Domaines d'intérêt : développement web/mobile/jeu, intelligence artificielle, data science.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="dark:border-t dark:border-[#8B5A2B]/30 border-t border-[#C17E3C]/30 py-6 md:py-8 dark:bg-[#2A2522] bg-[#F5F1E8]">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <div className="flex gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-[#E8D0A9]/50 text-[#6A4423]/50 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-[#E8D0A9]/50 text-[#6A4423]/50 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:laliaazumii@gmail.com"
              className="dark:text-[#E8D0A9]/50 text-[#6A4423]/50 dark:hover:text-[#C17E3C] hover:text-[#8B5A2B] transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
          <p className="text-sm dark:text-[#E8D0A9]/50 text-[#6A4423]/50 font-serif">© 2025 Iavo Lalia</p>
        </div>
      </footer>
    </div>
  )
}

// Project Card Component
function ProjectCard({ id, title, description, image, tags, onView, demoUrl, variant = "mechanical" }) {
  const variantStyles = {
    mechanical: {
      border: "border-[#8B5A2B]/20",
      badge:
        "bg-[#8B5A2B]/20 text-[#674621] border-[#8B5A2B]/50 dark:bg-[#C9B894]/30 dark:text-[#E8D0A9] dark:border-[#C9B894]/50",
      accent: "text-[#C17E3C]",
      icon: (
        <div className="absolute top-3 right-3 w-10 h-10 opacity-30">
          <div className="w-full h-full rounded-full border-2 border-[#C17E3C] animate-spin-slow flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-[#8B5A2B] animate-spin-reverse"></div>
          </div>
        </div>
      ),
    },
    alchemical: {
      border: "border-[#1D3E2F]/20",
      badge:
        "dark:bg-[#1D3E2F]/50 dark:text-[#A3C9A8] dark:border-[#1D3E2F] bg-[#A3C9A8]/50 text-[#1D3E2F] border-[#A3C9A8] font-serif",
      accent: "text-[#A3C9A8]",
      icon: (
        <div className="absolute top-3 right-3 w-10 h-10 opacity-30">
          <div className="w-full h-full rounded-full border-2 border-[#A3C9A8] animate-pulse-slow">
            <div className="w-full h-full rounded-full bg-[#A3C9A8]/20 animate-ping"></div>
          </div>
        </div>
      ),
    },
  }

  const [isHovered, setIsHovered] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <Card
      ref={ref}
      className={`dark:bg-[#2A2522] bg-[#F5F1E8] ${variantStyles[variant].border} overflow-hidden transition-all duration-500 group hover:shadow-xl hover:-translate-y-2 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#2A2522] via-transparent to-transparent z-10 transition-opacity duration-300 ${isHovered ? "opacity-50" : "opacity-70"}`}
        ></div>
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? "scale-110 brightness-110" : "scale-100"}`}
        />
        {/* Decorative icon */}
        {variantStyles[variant].icon}

        {/* Floating elements */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className={`w-2 h-2 rounded-full ${variantStyles[variant].accent === "text-[#C17E3C]" ? "bg-[#C17E3C]" : "bg-[#A3C9A8]"} animate-pulse`}
          ></div>
        </div>
        <div className="absolute bottom-4 right-4 z-20">
          <div
            className={`w-1 h-1 rounded-full ${variantStyles[variant].accent === "text-[#C17E3C]" ? "bg-[#8B5A2B]" : "bg-[#7A9E7E]"} animate-ping`}
          ></div>
        </div>
      </div>

      <CardContent className="p-5 relative z-20">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-xl dark:text-[#E8D0A9] text-[#6A4423] font-serif group-hover:text-[#C17E3C] transition-colors duration-300">
              {title}
            </h3>
            <div
              className={`w-3 h-3 rounded-full ${variantStyles[variant].accent === "text-[#C17E3C]" ? "bg-[#C17E3C]" : "bg-[#A3C9A8]"} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>
          </div>

          <p className="text-sm dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                className={`${variantStyles[variant].badge} font-serif hover:scale-105 transition-transform duration-200`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#E8D0A9]/10">
  <Button
    size="sm"
    onClick={() => onView(id)}
    className="ml-auto bg-[#8B5A2B] hover:bg-[#6A4423] text-[#E8D0A9] border-none font-serif relative overflow-hidden group/btn"
  >
    Afficher
    <span className="absolute inset-0 bg-gradient-to-r from-[#C17E3C] to-[#8B5A2B] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"></span>
  </Button>
</div>

        </div>
      </CardContent>
    </Card>
  )
}

// Skill Card Component avec barres de progression
function SkillCard({ title, icon, skills, variant = "mechanical" }) {
  const variantStyles = {
    mechanical: {
      border: "border-[#8B5A2B]/20",
      bg: "bg-[#8B5A2B]/10",
      progressBar: "bg-gradient-to-r from-[#C17E3C] to-[#8B5A2B]",
      decoration: (
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
          <div className="w-full h-full rounded-full border-2 border-[#C17E3C] animate-spin-slow flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#8B5A2B] animate-spin-reverse"></div>
          </div>
        </div>
      ),
    },
    alchemical: {
      border: "border-[#1D3E2F]/20",
      bg: "bg-[#1D3E2F]/30",
      progressBar: "bg-gradient-to-r from-[#A3C9A8] to-[#7A9E7E]",
      decoration: (
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
          <div className="w-full h-full rounded-full border-2 border-[#A3C9A8] animate-pulse-slow"></div>
        </div>
      ),
    },
  }

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  // Fonction pour créer les barres de progression
  const renderSkillProgress = (level) => {
    return (
      <div className="w-full space-y-1">
        <div className="w-full bg-[#E8D0A9]/10 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`${variantStyles[variant].progressBar} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: inView ? `${level}%` : "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card
      ref={ref}
      className={`dark:bg-[#2A2522] bg-[#F5F1E8] ${variantStyles[variant].border} overflow-hidden transition-all duration-500 hover:shadow-lg relative group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <CardContent className="p-4 space-y-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div
            className={`p-3 ${variantStyles[variant].bg} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] mb-4 font-serif">{title}</h3>
          <div className="space-y-4 w-full">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif text-sm">{skill.name}</span>
                  <span className="dark:text-[#E8D0A9]/60 text-[#6A4423]/60 font-serif text-xs">{skill.level}%</span>
                </div>
                {renderSkillProgress(skill.level)}
                <div className="text-xs dark:text-[#E8D0A9]/60 text-[#6A4423]/60 italic font-serif text-center">
                  {skill.rune}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      {/* Decorative element */}
      {variantStyles[variant].decoration}
    </Card>
  )
}

// Timeline Item Component
function TimelineItem({ title, date, description, badge, variant = "mechanical" }) {
  const variantStyles = {
    mechanical: {
      dot: "bg-[#C17E3C]",
      badge:
        "bg-[#8B5A2B]/20 text-[#674621] border-[#8B5A2B]/50 dark:bg-[#C9B894]/30 dark:text-[#E8D0A9] dark:border-[#C9B894]/50",
      icon: (
        <div className="absolute left-[-30px] top-[-5px] w-6 h-6 opacity-80">
          <div className="w-full h-full rounded-full border-2 border-[#C17E3C] animate-spin-slow"></div>
        </div>
      ),
    },
    alchemical: {
      dot: "bg-[#A3C9A8]",
      badge: "bg-[#1D3E2F]/50 text-[#A3C9A8] border-[#1D3E2F]",
      icon: (
        <div className="absolute left-[-30px] top-[-5px] w-6 h-6 opacity-80">
          <div className="w-full h-full rounded-full border-2 border-[#A3C9A8] animate-pulse-slow"></div>
        </div>
      ),
    },
  }

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`relative pl-8 border-l-2 border-[#E8D0A9]/10 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className={`absolute left-[-5px] top-0 h-3 w-3 rounded-full ${variantStyles[variant].dot}`}></div>
      {variantStyles[variant].icon}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold dark:text-[#E8D0A9] text-[#6A4423] font-serif">{title}</h3>
          {badge && <Badge className={`${variantStyles[variant].badge} font-serif`}>{badge}</Badge>}
        </div>
        {date && <p className="text-sm dark:text-[#E8D0A9]/60 text-[#6A4423]/60 font-serif">{date}</p>}
        {typeof description === "string" ? (
          <p className="dark:text-[#E8D0A9]/80 text-[#6A4423]/80 font-serif">{description}</p>
        ) : (
          description
        )}
      </div>
    </div>
  )
}
