import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img
                    src="/storage/logo-nusaku-hitam.png"
                    alt="Gampong Nusa Logo"
                />
            </div>
            <div className="ml-1 grid font-dancing italic leading-tight">
                <span className="text-lg font-bold">Gampong Nusa</span>
                <span className="text-xs">Lhoknga, Aceh Besar</span>
            </div>
        </>
    );
}
