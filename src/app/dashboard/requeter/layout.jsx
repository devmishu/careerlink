import { requireRole } from '@/lib/core/session';

const RequeterLayout = async ({ children }) => {
    await requireRole("requeter");
    return children
};

export default RequeterLayout;