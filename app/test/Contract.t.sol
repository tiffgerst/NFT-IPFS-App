// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Certificate.sol";

contract NFTTest is Test {
    Certificates public nft;
    address public deployer = 0x9B8d8aa6B0d3AEbCE6e4F702357BA54A914e07C7;
    address public user = vm.addr(1);

    function setUp() public {
        vm.prank(deployer);
        nft = new Certificates();
        vm.label(address(nft), "Contract");
        vm.label(deployer, "deployer");
        vm.label(user, "user");
        emit log_string("Contract deployed to:");
        emit log_address(address(nft));

    }

    function testMint() public {
        vm.prank(address(deployer));
        nft.createCertificate("URI");
        assertEq(nft.tokenURI(1),"URI");
        assertEq(nft.ownerOf(1),deployer);
        assertEq(nft.balanceOf(deployer),1);
        vm.prank(user);
        nft.createCertificate("https://verisart-tiff.infura-ipfs.io/ipfs/QmRoYnGc31SFpAxD7KtRVXSGitsmmsPnsViq9KR4FK7MGd");
        assertEq(nft.tokenURI(2), "https://verisart-tiff.infura-ipfs.io/ipfs/QmRoYnGc31SFpAxD7KtRVXSGitsmmsPnsViq9KR4FK7MGd");
        assertEq(nft.ownerOf(2),user);
        assertEq(nft.balanceOf(user),1);
        vm.prank(user);
        nft.createCertificate("https://verisart-tiff.infura-ipfs.io/ipfs/QmRoYnGc31SFpAxD7KtRVXSGitsmmsPnsViq9KR4FK7MGd");
        assertEq(nft.balanceOf(user),2);
    }

    function testFailMintToZeroAddress() public{
        vm.prank(address(0));
        nft.createCertificate("URI");
        assertEq(nft.tokenURI(1),"URI");
    }

    function testTransfer() public{
        vm.prank(deployer);
        nft.createCertificate("URI");
        vm.prank(deployer);
        nft.safeTransferFrom(deployer,user, 1);
        assertTrue(nft.ownerOf(1) == user);
    }
function testApprove() public {
    vm.prank(deployer);
     nft.createCertificate("URI");
     vm.prank(user);
     vm.expectRevert(bytes('ERC721: caller is not token owner or approved'));
     nft.safeTransferFrom(deployer,user, 1);
     vm.prank(deployer);
     nft.approve(user,1);
     vm.prank(user);
     nft.safeTransferFrom(deployer,user, 1);
}

}
