import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { TestResult } from './screens/TestResult'
import { ProfileCreation } from './screens/ProfileCreation'
import { PersonalizedProgram } from './screens/PersonalizedProgram'
import { OnboardingComplete } from './screens/OnboardingComplete'
import { TrainingVideos } from './screens/TrainingVideos'
import { VideoDetails } from './screens/VideoDetails'
import { VideoPlayer } from './screens/VideoPlayer'
import { LessonComplete } from './screens/LessonComplete'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<TestResult />} />
        <Route path="/profile" element={<ProfileCreation />} />
        <Route path="/program" element={<PersonalizedProgram />} />
        <Route path="/program/active" element={<OnboardingComplete />} />
        <Route path="/training" element={<TrainingVideos />} />
        <Route path="/training/video/:number" element={<VideoDetails />} />
        <Route path="/training/video/:number/player" element={<VideoPlayer />} />
        <Route path="/training/video/:number/complete" element={<LessonComplete />} />
      </Routes>
    </>
  )
}
