// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IUniswapV2Router {
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);
    
    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function getAmountsOut(uint amountIn, address[] memory path)
        external
        view
        returns (uint[] memory amounts);
}

contract Web3Bank is ReentrancyGuard, Ownable {
    IUniswapV2Router public constant UNISWAP_ROUTER = 
        IUniswapV2Router(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    
    uint256 public constant PLATFORM_FEE_BPS = 8; // 0.08% (8 basis points) - Lower than all major swap platforms
    uint256 public constant BASIS_POINTS = 10000;
    
    address public feeRecipient;
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    
    struct SwapTransaction {
        address user;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOut;
        uint256 feeAmount;
        uint256 timestamp;
    }
    
    mapping(address => SwapTransaction[]) public userTransactions;
    SwapTransaction[] public allTransactions;
    
    event SwapExecuted(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 feeAmount
    );
    
    event FeesWithdrawn(address indexed recipient, uint256 amount);
    
    constructor(address _feeRecipient) Ownable(msg.sender) {
        require(_feeRecipient != address(0), "Invalid fee recipient");
        feeRecipient = _feeRecipient;
    }
    
    function swapETHForTokens(
        address tokenOut,
        uint256 amountOutMin,
        uint256 deadline
    ) external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        require(deadline > block.timestamp, "Deadline passed");
        require(tokenOut != address(0), "Invalid token");
        
        // Calculate platform fee (0.1%)
        uint256 feeAmount = (msg.value * PLATFORM_FEE_BPS) / BASIS_POINTS;
        uint256 swapAmount = msg.value - feeAmount;
        
        // Transfer fee to platform
        (bool feeSuccess, ) = feeRecipient.call{value: feeAmount}("");
        require(feeSuccess, "Fee transfer failed");
        
        // Prepare Uniswap swap path
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = tokenOut;
        
        // Execute swap
        uint[] memory amounts = UNISWAP_ROUTER.swapExactETHForTokens{value: swapAmount}(
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
        
        // Record transaction
        SwapTransaction memory tx = SwapTransaction({
            user: msg.sender,
            tokenIn: address(0),
            tokenOut: tokenOut,
            amountIn: msg.value,
            amountOut: amounts[amounts.length - 1],
            feeAmount: feeAmount,
            timestamp: block.timestamp
        });
        
        userTransactions[msg.sender].push(tx);
        allTransactions.push(tx);
        
        emit SwapExecuted(
            msg.sender,
            address(0),
            tokenOut,
            msg.value,
            amounts[amounts.length - 1],
            feeAmount
        );
    }
    
    function swapTokensForETH(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) external nonReentrant {
        require(amountIn > 0, "Amount must be greater than 0");
        require(deadline > block.timestamp, "Deadline passed");
        require(tokenIn != address(0), "Invalid token");
        
        IERC20 token = IERC20(tokenIn);
        require(token.transferFrom(msg.sender, address(this), amountIn), "Transfer failed");
        
        // Calculate platform fee
        uint256 feeAmount = (amountIn * PLATFORM_FEE_BPS) / BASIS_POINTS;
        uint256 swapAmount = amountIn - feeAmount;
        
        // Transfer fee to platform
        require(token.transfer(feeRecipient, feeAmount), "Fee transfer failed");
        
        // Approve Uniswap router
        require(token.approve(address(UNISWAP_ROUTER), swapAmount), "Approval failed");
        
        // Prepare swap path
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = WETH;
        
        // Execute swap
        uint[] memory amounts = UNISWAP_ROUTER.swapExactTokensForETH(
            swapAmount,
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
        
        // Record transaction
        SwapTransaction memory tx = SwapTransaction({
            user: msg.sender,
            tokenIn: tokenIn,
            tokenOut: address(0),
            amountIn: amountIn,
            amountOut: amounts[amounts.length - 1],
            feeAmount: feeAmount,
            timestamp: block.timestamp
        });
        
        userTransactions[msg.sender].push(tx);
        allTransactions.push(tx);
        
        emit SwapExecuted(
            msg.sender,
            tokenIn,
            address(0),
            amountIn,
            amounts[amounts.length - 1],
            feeAmount
        );
    }
    
    function swapTokensForTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        uint256 deadline
    ) external nonReentrant {
        require(amountIn > 0, "Amount must be greater than 0");
        require(deadline > block.timestamp, "Deadline passed");
        require(tokenIn != address(0) && tokenOut != address(0), "Invalid token");
        
        IERC20 token = IERC20(tokenIn);
        require(token.transferFrom(msg.sender, address(this), amountIn), "Transfer failed");
        
        // Calculate platform fee
        uint256 feeAmount = (amountIn * PLATFORM_FEE_BPS) / BASIS_POINTS;
        uint256 swapAmount = amountIn - feeAmount;
        
        // Transfer fee to platform
        require(token.transfer(feeRecipient, feeAmount), "Fee transfer failed");
        
        // Approve Uniswap router
        require(token.approve(address(UNISWAP_ROUTER), swapAmount), "Approval failed");
        
        // Prepare swap path
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        
        // Execute swap
        uint[] memory amounts = UNISWAP_ROUTER.swapExactTokensForTokens(
            swapAmount,
            amountOutMin,
            path,
            msg.sender,
            deadline
        );
        
        // Record transaction
        SwapTransaction memory tx = SwapTransaction({
            user: msg.sender,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            amountOut: amounts[amounts.length - 1],
            feeAmount: feeAmount,
            timestamp: block.timestamp
        });
        
        userTransactions[msg.sender].push(tx);
        allTransactions.push(tx);
        
        emit SwapExecuted(
            msg.sender,
            tokenIn,
            tokenOut,
            amountIn,
            amounts[amounts.length - 1],
            feeAmount
        );
    }
    
    function getUserTransactionCount(address user) external view returns (uint256) {
        return userTransactions[user].length;
    }
    
    function getUserTransactions(address user, uint256 start, uint256 count)
        external
        view
        returns (SwapTransaction[] memory)
    {
        uint256 total = userTransactions[user].length;
        if (start >= total) {
            return new SwapTransaction[](0);
        }
        
        uint256 end = start + count;
        if (end > total) {
            end = total;
        }
        
        SwapTransaction[] memory result = new SwapTransaction[](end - start);
        for (uint256 i = start; i < end; i++) {
            result[i - start] = userTransactions[user][total - 1 - i];
        }
        
        return result;
    }
    
    function setFeeRecipient(address _feeRecipient) external onlyOwner {
        require(_feeRecipient != address(0), "Invalid address");
        feeRecipient = _feeRecipient;
    }
    
    function withdrawFees(address token, uint256 amount) external onlyOwner {
        if (token == address(0)) {
            (bool success, ) = feeRecipient.call{value: amount}("");
            require(success, "Withdrawal failed");
        } else {
            IERC20(token).transfer(feeRecipient, amount);
        }
        emit FeesWithdrawn(feeRecipient, amount);
    }
    
    receive() external payable {
        // Allow contract to receive ETH
    }
}

