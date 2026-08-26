import { useEffect } from "react";
import SectionHeading from "../components/common/SectionHeading";
import NoticesGrid from "../components/notice/NoticesGrid";
import { useNotices } from "../context/NoticeContext";

export default function NoticePage() {
  const { notices, loading, markAllSeen } = useNotices();

  // Visiting this page is what clears the unseen badge in the navbar.
  useEffect(() => {
    if (!loading) markAllSeen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, notices.length]);

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          kicker="Notice Board"
          title="What the department wants you to know."
          description="Posted by your faculty as PDFs — newest first."
        />
        <NoticesGrid notices={notices} loading={loading} />
      </div>
    </section>
  );
}
