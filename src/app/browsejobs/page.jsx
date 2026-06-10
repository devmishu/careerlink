
import JobListit from '@/components/jobs/JobListit';
import { getAllJobs } from '@/lib/api/jobs';

const BrowseJobsPage = async () => {
  const jobsData = await getAllJobs();

  console.log("JobsData...............",jobsData.data);

  return <JobListit jobsData={jobsData.data}/>
};

export default BrowseJobsPage; 