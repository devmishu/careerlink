
import { PaginationSimplePrevNext } from '@/components/common/PaginationWithSummary';
import JobListit from '@/components/jobs/JobListit';
import { getAllJobs } from '@/lib/api/jobs';

const BrowseJobsPage = async ({ searchParams }) => {


  const filters = await searchParams;
  console.log('search quary....,', filters);

  const quarySearch = new URLSearchParams(filters);
  const quaryString = quarySearch.toString();
  console.log("quaryString..........", quaryString);

  const jobsData = await getAllJobs(quaryString);




  console.log("JobsData...............", jobsData?.data?.result);

  return <div>
    <JobListit
      jobsData={jobsData?.data?.result}
      total={jobsData?.data?.total}
      filters={filters}
    />
  </div>
};

export default BrowseJobsPage; 