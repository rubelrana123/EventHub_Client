import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import cardioDoc from '../../../assets/images/host-cardiologist.jpg';
import neurolDoc from '../../../assets/images/host-neurologist.jpg';
import orthoDoc from '../../../assets/images/host-orthopedic.jpg';

const hosts = [
  {
    name: 'Dr. Cameron Williamson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 23,
    image: cardioDoc,
  },
  {
    name: 'Dr. Leslie Alexander',
    specialty: 'Neurologist',
    rating: 4.8,
    reviews: 45,
    image: neurolDoc,       
  },
  {
    name: 'Dr. Robert Fox',
    specialty: 'Orthopedic',
    rating: 4.9,
    reviews: 32,
    image: orthoDoc,
  },
];

const HostCard = ({ host }: { host: typeof hosts[0] }) => {
    return (
        <Card className="text-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-blue-50/50 items-center p-6">
                <Image 
                    src={host.image} 
                    alt={host.name} 
                    width={96} 
                    height={96}
                    className="rounded-full border-4 border-white shadow-md"
                />
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="text-lg">{host.name}</CardTitle>
                <p className="text-primary font-medium mt-1">{host.specialty}</p>
                <div className="flex items-center justify-center my-3 text-sm">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="ml-2 text-foreground font-semibold">{host.rating}</span>
                    <span className="ml-2 text-muted-foreground">({host.reviews} reviews)</span>
                </div>
            </CardContent>
             <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                <Button variant="outline">View Profile</Button>
                <Button>Book Now</Button>
            </CardFooter>
        </Card>
    )
}

const TopRatedHosts = () => {
  return (
    <section className="bg-blue-50/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">Our Top Rated Host</h2>
          <p className="text-muted-foreground mt-4">
            Access to medical experts from various specialities, ready to provide you with top-notch medical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {hosts.map(host => <HostCard key={host.name} host={host} />)}
        </div>
        
        <div className="text-center mt-12">
            <Button size="lg">View All Hosts</Button>
        </div>
      </div>
    </section>
  );
};

export default TopRatedHosts;
