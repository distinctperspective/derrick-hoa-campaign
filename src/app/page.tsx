import HomePage from '@/app/components/HomePage';
import { BuildingOffice2Icon } from '@/app/components/icons';

/**
 * The main page component that renders the campaign HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return (
        <HomePage>
            {/* Amenities Quality */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <BuildingOffice2Icon className="h-6 w-6 text-teal-500" />
                    <h3 className="text-xl font-bold text-[#0B3558]">Amenities Quality</h3>
                </div>
                <p className="text-gray-600">Second highest at 19.0% of responses</p>
            </div>
        </HomePage>
    );
};

export default Page;
