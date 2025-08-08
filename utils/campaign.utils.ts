import { Page } from "@playwright/test";
import { GeneralUtils } from "./general.utils";

export class CampaignUtils {
    page : Page;

    constructor(page : Page) {
        this.page = page;
    }

    public async createCampaign() {
        console.log('Create Campaing Started...')

        await this.page.getByRole('button', { name: ' Marketing' }).click();

        await GeneralUtils.sleep(1000);

        const isEcoFriendExists = await this.page.getByRole('cell', { name: ' Eco friendly' }).isVisible();
        if(!isEcoFriendExists) {
            await this.page.getByRole('button', { name: /New campaign/i }).click();
            await this.page.getByRole('cell', { name: /Eco-friendly Increases/i }).click();
            await this.page.waitForLoadState('domcontentloaded');
            const dollarButton = this.page.getByRole('button', { name: /\$/ });
            await dollarButton.waitFor({ timeout: 30000 });
            await dollarButton.click();
            console.log("Eco Friendly Campaign Created Successfully!");
        }

        console.log('Campaign Created Finished!');
    }
}
