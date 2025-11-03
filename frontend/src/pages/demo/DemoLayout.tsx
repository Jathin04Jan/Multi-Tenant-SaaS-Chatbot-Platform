// [schema-demo:additive]
import { Outlet } from 'react-router-dom';
import { DemoSessionProvider } from '@/demo/DemoSession';

const DemoLayout = () => {
  return (
    <DemoSessionProvider>
      <div className="p-4">
        <Outlet />
      </div>
    </DemoSessionProvider>
  );
};

export default DemoLayout;


