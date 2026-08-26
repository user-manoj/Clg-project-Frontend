import { apiClient } from "./client";

export async function fetchTests() {
  return apiClient.get("/tests").then((r) => r.data);
}

export async function fetchAllTestsForLecturer() {
  return apiClient.get("/tests/mine").then((r) => r.data);
}

export async function fetchTestQuestions(testId) {
  return apiClient.get(`/tests/${testId}/questions`).then((r) => r.data);
}

export async function submitTestAttempt(testId, answers) {
  return apiClient.post(`/tests/${testId}/submit`, { answers }).then((r) => r.data);
}

// The frontend's CreateTest form works with "durationMinutes" and
// "correctIndex" — but the backend's TestRequestDTO/QuestionRequestDTO
// use "durationMin" and "answer" instead. Rather than change the whole
// form (and every component reading its state), this is the one place
// that translates between the two, right before the request goes out.
export async function createTest({ title, subject, durationMinutes, questions }) {
  const payload = {
    title,
    subject,
    durationMin: Number(durationMinutes),
    questions: questions.map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.correctIndex,
    })),
  };

  return apiClient.post("/tests", payload).then((r) => r.data);
}

// "Conducting" a test flips it from DRAFT to AVAILABLE, making it
// visible to students in the Test Center.
export async function conductTest(testId) {
  return apiClient.patch(`/tests/${testId}`, { status: "AVAILABLE" }).then((r) => r.data);
}

export async function deleteTest(testId) {
  return apiClient.delete(`/tests/${testId}`).then((r) => r.data);
}
