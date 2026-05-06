"use client";

import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItemButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bot,
  BookOpen,
  Captions,
  Compass,
  History,
  Home,
  Library,
  Menu,
  Play,
  ShieldCheck,
  UserCircle,
  Video,
  X,
} from "@/components/animated-icons";

import { AiModal } from "@/components/ai-modal";
import { VideoModal, type VideoModalSelection } from "@/components/video-modal";
import { YouTubeSearch } from "@/components/youtube-search";
import { languageInsights } from "@/lib/language-insights";
import type { LanguageInsight } from "@/lib/language-insights";
import { getChannelForLanguage, languageFilters, type LanguageFilter } from "@/lib/videos";

const languageFlagMap: Record<LanguageFilter, string> = {
  All: "🌐",
  Spanish: "🇪🇸",
  Dutch: "🇳🇱",
  Japanese: "🇯🇵",
  Italian: "🇮🇹",
  English: "🇬🇧",
};

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Languages", icon: ShieldCheck },
  { label: "Culture", icon: BookOpen },
  { label: "History", icon: History },
  { label: "Library", icon: Library },
];

function WikipediaIcon({ className }: { className?: string }) {
  return (
    <Box
      component="span"
      className={className}
      sx={{
        display: "inline-grid",
        placeItems: "center",
        fontFamily: "Georgia, serif",
        fontSize: "1.1em",
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      W
    </Box>
  );
}

export function LanguageVideoApp() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageFilter>("All");
  const [isYouTubeOpen, setIsYouTubeOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [wikiSelection, setWikiSelection] = useState<LanguageInsight | null>(null);
  const [modalSelection, setModalSelection] = useState<VideoModalSelection | null>(null);

  const activeInsight = activeLanguage === "All" ? null : languageInsights.find((item) => item.language === activeLanguage) ?? null;

  function openYouTubeDiscovery() {
    setIsYouTubeOpen(true);
  }

  function handleLanguageSelect(language: LanguageFilter) {
    setActiveLanguage(language);
    setIsYouTubeOpen(language !== "All");
  }

  function openLanguageChannel(language: LanguageFilter) {
    setActiveLanguage(language);
    setIsYouTubeOpen(true);
  }

  return (
    <Box component="main" sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", pb: { xs: 9, md: 0 } }}>
      <AppBar position="sticky" elevation={0} color="transparent" sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(12px)", zIndex: 1200 }}>
        <Toolbar sx={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr) auto", gap: 2, minHeight: 80, px: { xs: 2, sm: 3, lg: 4 } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Tooltip title="Menu">
              <IconButton aria-label="Menu" sx={{ display: { lg: "none" } }}>
                <Menu className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
            <Tooltip title="LingoStream">
              <Paper
                elevation={1}
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  color: "primary.main",
                  bgcolor: "color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Play className="animated-icon ml-0.5 size-6 fill-current" />
              </Paper>
            </Tooltip>
          </Stack>

          <Box sx={{ minWidth: 0, overflowX: "auto" }}>
            <Paper
              elevation={1}
              sx={{
                mx: "auto",
                display: "flex",
                width: "max-content",
                maxWidth: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                borderRadius: 999,
                p: 0.75,
                bgcolor: "background.paper",
              }}
            >
              {languageFilters.map((language) => (
                <Tooltip key={language} title={language}>
                  <IconButton
                    type="button"
                    aria-label={language}
                    onClick={() => handleLanguageSelect(language)}
                    color={activeLanguage === language ? "primary" : "default"}
                    sx={{
                      width: 56,
                      height: 56,
                      fontSize: 28,
                      bgcolor: activeLanguage === language ? "primary.main" : "background.default",
                      color: activeLanguage === language ? "primary.contrastText" : "text.primary",
                      border: 1,
                      borderColor: activeLanguage === language ? "primary.main" : "divider",
                      "&:hover": {
                        bgcolor: activeLanguage === language ? "primary.main" : "action.hover",
                      },
                    }}
                  >
                    <span aria-hidden="true">{languageFlagMap[language]}</span>
                  </IconButton>
                </Tooltip>
              ))}
            </Paper>
          </Box>

          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <Tooltip title="AI">
              <IconButton aria-label="AI" onClick={() => setIsAiOpen(true)}>
                <Bot className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
            <Tooltip title="YouTube">
              <IconButton aria-label="YouTube" onClick={openYouTubeDiscovery}>
                <Video className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
            <Tooltip title={activeInsight ? `${activeInsight.language} Wikipedia` : "Select a language first"}>
              <span>
                <IconButton aria-label="Wikipedia language information" disabled={!activeInsight} onClick={() => activeInsight && setWikiSelection(activeInsight)}>
                  <WikipediaIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Explore">
              <IconButton aria-label="Explore">
                <Compass className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton aria-label="Profile">
                <UserCircle className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "72px minmax(0, 1fr)" }, width: "100%" }}>
        <Box
          component="aside"
          sx={{
            display: { xs: "none", lg: "block" },
            borderRight: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            px: 1,
            py: 2,
          }}
        >
          <List sx={{ position: "sticky", top: 96, display: "grid", gap: 0.5 }}>
            {navItems.map((item) => (
              <Tooltip key={item.label} title={item.label} placement="right">
                <ListItemButton
                  aria-label={item.label}
                  selected={item.active}
                  sx={{
                    minHeight: 44,
                    justifyContent: "center",
                    borderRadius: 2,
                    color: item.active ? "primary.main" : "text.secondary",
                  }}
                >
                  <item.icon className="animated-icon size-5" />
                </ListItemButton>
              </Tooltip>
            ))}
          </List>
        </Box>

        <Box sx={{ minWidth: 0, px: { xs: 2, sm: 3, lg: 4 }, py: 3 }}>
          <Stack spacing={2}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between" }}>
                <Box>
                  <Chip label="Wikipedia dashboard" color="primary" variant="filled" sx={{ mb: 2 }} />
                  <Typography component="h1" variant="h1" sx={{ maxWidth: 760 }}>
                    Language, culture, and history at a glance
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 680 }}>
                    Explore each language as a cultural system before jumping into channel videos from the top bar.
                  </Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 56px)", gap: 1 }}>
                  {languageInsights.map((item) => (
                    <Paper
                      key={item.language}
                      variant="outlined"
                      sx={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 2, fontSize: 32 }}
                    >
                      <span aria-label={item.language} role="img">
                        {item.flag}
                      </span>
                    </Paper>
                  ))}
                </Box>
              </Stack>
            </Paper>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
              {languageInsights.map((item) => (
                <Card key={item.language} sx={{ borderRadius: 2, bgcolor: "background.paper" }}>
                  <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", justifyContent: "space-between", mb: 2.5 }}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0 }}>
                        <Paper variant="outlined" sx={{ display: "grid", placeItems: "center", width: 64, height: 64, borderRadius: 2, fontSize: 40, flex: "0 0 auto" }}>
                          <span aria-label={item.language} role="img">
                            {item.flag}
                          </span>
                        </Paper>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h2">{item.language}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.region}
                          </Typography>
                        </Box>
                      </Stack>
                      <Tooltip title={`${item.language} Wikipedia`}>
                        <IconButton aria-label={`${item.language} Wikipedia information`} onClick={() => setWikiSelection(item)} size="small">
                          <WikipediaIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1, mb: 2 }}>
                      {item.stats.map((stat) => (
                        <Paper key={stat.label} variant="outlined" sx={{ p: 1.25, borderRadius: 2, bgcolor: "action.hover" }}>
                          <Typography variant="caption" color="text.secondary">
                            {stat.label}
                          </Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
                            {stat.value}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>

                    {[
                      { label: "Language", icon: Captions, color: "primary.main", text: item.languageSummary },
                      { label: "Culture", icon: BookOpen, color: "secondary.main", text: item.cultureSummary },
                      { label: "History", icon: History, color: "warning.main", text: item.historySummary },
                    ].map((row, index) => (
                      <Box key={row.label}>
                        {index ? <Divider /> : null}
                        <Box sx={{ py: 2 }}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: row.color, mb: 0.75 }}>
                            <row.icon className="animated-icon size-4" />
                            <Typography variant="subtitle2">{row.label}</Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {row.text}
                          </Typography>
                        </Box>
                      </Box>
                    ))}

                    <Divider sx={{ mt: 0.5, mb: 1.5 }} />
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                      <Typography variant="caption" color="text.secondary">
                        Source topic: {item.wikipediaTopic}
                      </Typography>
                      <Button size="small" endIcon={<Video className="animated-icon size-4" />} onClick={() => openLanguageChannel(item.language)}>
                        Channel
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>

      <Paper
        component="nav"
        elevation={3}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          display: { xs: "flex", md: "none" },
          justifyContent: "space-around",
          borderTop: 1,
          borderColor: "divider",
          px: 1.5,
          py: 1,
        }}
      >
        {[
          { label: "Home", icon: Home, active: true },
          { label: "Lessons", icon: Library },
          { label: "Profile", icon: UserCircle },
        ].map((item) => (
          <Tooltip key={item.label} title={item.label}>
            <IconButton aria-label={item.label} color={item.active ? "primary" : "default"}>
              <item.icon className="animated-icon size-5" />
            </IconButton>
          </Tooltip>
        ))}
      </Paper>

      <Dialog fullScreen open={isYouTubeOpen} onClose={() => setIsYouTubeOpen(false)}>
        <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column", bgcolor: "background.default" }}>
          <Toolbar sx={{ borderBottom: 1, borderColor: "divider", justifyContent: "space-between" }}>
            <Paper variant="outlined" sx={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 1.5, color: "primary.main" }}>
              <Video className="animated-icon size-5" />
            </Paper>
            <Tooltip title="Close">
              <IconButton aria-label="Close YouTube discovery" onClick={() => setIsYouTubeOpen(false)}>
                <X className="animated-icon size-5" />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Box sx={{ minHeight: 0, flex: 1, overflowY: "auto" }}>
            <YouTubeSearch
              externalLanguage={activeLanguage}
              channel={getChannelForLanguage(activeLanguage)}
              onSelectVideo={(video) => {
                setIsYouTubeOpen(false);
                setModalSelection({ kind: "youtube", video });
              }}
            />
          </Box>
        </Box>
      </Dialog>

      <Dialog open={Boolean(wikiSelection)} onClose={() => setWikiSelection(null)} fullWidth maxWidth="md">
        {wikiSelection ? (
          <>
            <DialogTitle sx={{ pr: 7 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Paper variant="outlined" sx={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 2, fontSize: 34 }}>
                  <span aria-label={wikiSelection.language} role="img">
                    {wikiSelection.flag}
                  </span>
                </Paper>
                <Box sx={{ minWidth: 0 }}>
                  <Typography component="h2" variant="h2">
                    {wikiSelection.language}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {wikiSelection.region}
                  </Typography>
                </Box>
              </Stack>
              <Tooltip title="Close">
                <IconButton
                  aria-label="Close Wikipedia information"
                  onClick={() => setWikiSelection(null)}
                  sx={{ position: "absolute", right: 16, top: 16 }}
                >
                  <X className="animated-icon size-5" />
                </IconButton>
              </Tooltip>
            </DialogTitle>

            <DialogContent dividers>
              <Stack spacing={2.5}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" }, gap: 1.5 }}>
                  {wikiSelection.stats.map((stat) => (
                    <Paper key={stat.label} variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: "action.hover" }}>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                {[
                  { label: "Language", icon: Captions, color: "primary.main", text: wikiSelection.languageSummary },
                  { label: "Culture", icon: BookOpen, color: "secondary.main", text: wikiSelection.cultureSummary },
                  { label: "History", icon: History, color: "warning.main", text: wikiSelection.historySummary },
                ].map((section, index) => (
                  <Box key={section.label}>
                    {index ? <Divider sx={{ mb: 2.5 }} /> : null}
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: section.color, mb: 1 }}>
                      <section.icon className="animated-icon size-5" />
                      <Typography variant="h6">{section.label}</Typography>
                    </Stack>
                    <Typography color="text.secondary">{section.text}</Typography>
                  </Box>
                ))}

                <Divider />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Resources
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                    {wikiSelection.resources.map((resource) => (
                      <Chip
                        key={resource.url}
                        component={Link}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        clickable
                        label={resource.label}
                        variant="outlined"
                        icon={<WikipediaIcon />}
                        sx={{
                          textDecoration: "none",
                          "& .MuiChip-icon": {
                            color: "inherit",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Divider />
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary" }}>
                  <WikipediaIcon />
                  <Typography variant="caption">Source topic: {wikiSelection.wikipediaTopic}</Typography>
                </Stack>
              </Stack>
            </DialogContent>
          </>
        ) : null}
      </Dialog>

      <AiModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <VideoModal selection={modalSelection} onClose={() => setModalSelection(null)} />
    </Box>
  );
}
